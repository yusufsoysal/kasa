import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RecurringIncome } from './recurring-income.model';
import { RecurringIncomePopupService } from './recurring-income-popup.service';
import { RecurringIncomeService } from './recurring-income.service';
import { Circle, CircleService } from '../circle';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-recurring-income-dialog',
    templateUrl: './recurring-income-dialog.component.html'
})
export class RecurringIncomeDialogComponent implements OnInit {

    recurringIncome: RecurringIncome;
    isSaving: boolean;

    circles: Circle[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private recurringIncomeService: RecurringIncomeService,
        private circleService: CircleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.circleService
            .query({filter: 'recurringincome-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.recurringIncome.circle || !this.recurringIncome.circle.id) {
                    this.circles = res.json;
                } else {
                    this.circleService
                        .find(this.recurringIncome.circle.id)
                        .subscribe((subRes: Circle) => {
                            this.circles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.recurringIncome.id !== undefined) {
            this.subscribeToSaveResponse(
                this.recurringIncomeService.update(this.recurringIncome));
        } else {
            this.subscribeToSaveResponse(
                this.recurringIncomeService.create(this.recurringIncome));
        }
    }

    private subscribeToSaveResponse(result: Observable<RecurringIncome>) {
        result.subscribe((res: RecurringIncome) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RecurringIncome) {
        this.eventManager.broadcast({ name: 'recurringIncomeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackCircleById(index: number, item: Circle) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-recurring-income-popup',
    template: ''
})
export class RecurringIncomePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recurringIncomePopupService: RecurringIncomePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.recurringIncomePopupService
                    .open(RecurringIncomeDialogComponent as Component, params['id']);
            } else {
                this.recurringIncomePopupService
                    .open(RecurringIncomeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
