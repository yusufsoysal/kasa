import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ExpensePopupService } from './expense-popup.service';
import { ExpenseService } from './expense.service';
import { User, UserService } from '../../shared';
import { Circle, CircleService } from '../circle';
import { Category, CategoryService } from '../category';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-expense-dialog',
    templateUrl: './expense-dialog.component.html'
})
export class ExpenseDialogComponent implements OnInit {

    expense: Expense;
    isSaving: boolean;

    users: User[];

    circles: Circle[];

    categories: Category[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private expenseService: ExpenseService,
        private userService: UserService,
        private circleService: CircleService,
        private categoryService: CategoryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.circleService
            .query({filter: 'expense-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.expense.circle || !this.expense.circle.id) {
                    this.circles = res.json;
                } else {
                    this.circleService
                        .find(this.expense.circle.id)
                        .subscribe((subRes: Circle) => {
                            this.circles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.expense.id !== undefined) {
            this.subscribeToSaveResponse(
                this.expenseService.update(this.expense));
        } else {
            this.subscribeToSaveResponse(
                this.expenseService.create(this.expense));
        }
    }

    private subscribeToSaveResponse(result: Observable<Expense>) {
        result.subscribe((res: Expense) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Expense) {
        this.eventManager.broadcast({ name: 'expenseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackCircleById(index: number, item: Circle) {
        return item.id;
    }

    trackCategoryById(index: number, item: Category) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-expense-popup',
    template: ''
})
export class ExpensePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expensePopupService: ExpensePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.expensePopupService
                    .open(ExpenseDialogComponent as Component, params['id']);
            } else {
                this.expensePopupService
                    .open(ExpenseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
