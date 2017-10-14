import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-expense',
    templateUrl: './expense.component.html'
})
export class ExpenseComponent implements OnInit, OnDestroy {
expenses: Expense[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private expenseService: ExpenseService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.expenseService.query().subscribe(
            (res: ResponseWrapper) => {
                this.expenses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExpenses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Expense) {
        return item.id;
    }
    registerChangeInExpenses() {
        this.eventSubscriber = this.eventManager.subscribe('expenseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
