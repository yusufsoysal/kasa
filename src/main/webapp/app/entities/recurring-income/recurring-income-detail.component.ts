import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RecurringIncome } from './recurring-income.model';
import { RecurringIncomeService } from './recurring-income.service';

@Component({
    selector: 'jhi-recurring-income-detail',
    templateUrl: './recurring-income-detail.component.html'
})
export class RecurringIncomeDetailComponent implements OnInit, OnDestroy {

    recurringIncome: RecurringIncome;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private recurringIncomeService: RecurringIncomeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRecurringIncomes();
    }

    load(id) {
        this.recurringIncomeService.find(id).subscribe((recurringIncome) => {
            this.recurringIncome = recurringIncome;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRecurringIncomes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'recurringIncomeListModification',
            (response) => this.load(this.recurringIncome.id)
        );
    }
}
