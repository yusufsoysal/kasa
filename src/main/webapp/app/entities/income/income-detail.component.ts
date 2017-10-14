import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Income } from './income.model';
import { IncomeService } from './income.service';

@Component({
    selector: 'jhi-income-detail',
    templateUrl: './income-detail.component.html'
})
export class IncomeDetailComponent implements OnInit, OnDestroy {

    income: Income;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private incomeService: IncomeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIncomes();
    }

    load(id) {
        this.incomeService.find(id).subscribe((income) => {
            this.income = income;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIncomes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'incomeListModification',
            (response) => this.load(this.income.id)
        );
    }
}
