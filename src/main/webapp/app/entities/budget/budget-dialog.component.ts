import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Budget } from './budget.model';
import { BudgetPopupService } from './budget-popup.service';
import { BudgetService } from './budget.service';
import { Circle, CircleService } from '../circle';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-budget-dialog',
    templateUrl: './budget-dialog.component.html'
})
export class BudgetDialogComponent implements OnInit {

    budget: Budget;
    isSaving: boolean;

    circles: Circle[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private budgetService: BudgetService,
        private circleService: CircleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.circleService
            .query({filter: 'budget-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.budget.circle || !this.budget.circle.id) {
                    this.circles = res.json;
                } else {
                    this.circleService
                        .find(this.budget.circle.id)
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
        if (this.budget.id !== undefined) {
            this.subscribeToSaveResponse(
                this.budgetService.update(this.budget));
        } else {
            this.subscribeToSaveResponse(
                this.budgetService.create(this.budget));
        }
    }

    private subscribeToSaveResponse(result: Observable<Budget>) {
        result.subscribe((res: Budget) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Budget) {
        this.eventManager.broadcast({ name: 'budgetListModification', content: 'OK'});
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
    selector: 'jhi-budget-popup',
    template: ''
})
export class BudgetPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private budgetPopupService: BudgetPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.budgetPopupService
                    .open(BudgetDialogComponent as Component, params['id']);
            } else {
                this.budgetPopupService
                    .open(BudgetDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
