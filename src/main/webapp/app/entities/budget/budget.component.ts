import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Budget } from './budget.model';
import { BudgetService } from './budget.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-budget',
    templateUrl: './budget.component.html'
})
export class BudgetComponent implements OnInit, OnDestroy {
budgets: Budget[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private budgetService: BudgetService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.budgetService.query().subscribe(
            (res: ResponseWrapper) => {
                this.budgets = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBudgets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Budget) {
        return item.id;
    }
    registerChangeInBudgets() {
        this.eventSubscriber = this.eventManager.subscribe('budgetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
