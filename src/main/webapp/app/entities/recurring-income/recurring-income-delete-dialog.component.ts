import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RecurringIncome } from './recurring-income.model';
import { RecurringIncomePopupService } from './recurring-income-popup.service';
import { RecurringIncomeService } from './recurring-income.service';

@Component({
    selector: 'jhi-recurring-income-delete-dialog',
    templateUrl: './recurring-income-delete-dialog.component.html'
})
export class RecurringIncomeDeleteDialogComponent {

    recurringIncome: RecurringIncome;

    constructor(
        private recurringIncomeService: RecurringIncomeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recurringIncomeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'recurringIncomeListModification',
                content: 'Deleted an recurringIncome'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recurring-income-delete-popup',
    template: ''
})
export class RecurringIncomeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recurringIncomePopupService: RecurringIncomePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.recurringIncomePopupService
                .open(RecurringIncomeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
