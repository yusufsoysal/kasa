import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { RecurringIncome } from './recurring-income.model';
import { RecurringIncomeService } from './recurring-income.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-recurring-income',
    templateUrl: './recurring-income.component.html'
})
export class RecurringIncomeComponent implements OnInit, OnDestroy {
recurringIncomes: RecurringIncome[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private recurringIncomeService: RecurringIncomeService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.recurringIncomeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.recurringIncomes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRecurringIncomes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RecurringIncome) {
        return item.id;
    }
    registerChangeInRecurringIncomes() {
        this.eventSubscriber = this.eventManager.subscribe('recurringIncomeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
