import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Income } from './income.model';
import { IncomePopupService } from './income-popup.service';
import { IncomeService } from './income.service';
import { Circle, CircleService } from '../circle';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-income-dialog',
    templateUrl: './income-dialog.component.html'
})
export class IncomeDialogComponent implements OnInit {

    income: Income;
    isSaving: boolean;

    circles: Circle[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private incomeService: IncomeService,
        private circleService: CircleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.circleService
            .query({filter: 'income-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.income.circle || !this.income.circle.id) {
                    this.circles = res.json;
                } else {
                    this.circleService
                        .find(this.income.circle.id)
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
        if (this.income.id !== undefined) {
            this.subscribeToSaveResponse(
                this.incomeService.update(this.income));
        } else {
            this.subscribeToSaveResponse(
                this.incomeService.create(this.income));
        }
    }

    private subscribeToSaveResponse(result: Observable<Income>) {
        result.subscribe((res: Income) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Income) {
        this.eventManager.broadcast({ name: 'incomeListModification', content: 'OK'});
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
    selector: 'jhi-income-popup',
    template: ''
})
export class IncomePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incomePopupService: IncomePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.incomePopupService
                    .open(IncomeDialogComponent as Component, params['id']);
            } else {
                this.incomePopupService
                    .open(IncomeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
