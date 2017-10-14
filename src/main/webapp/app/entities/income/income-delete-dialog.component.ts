import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Income } from './income.model';
import { IncomePopupService } from './income-popup.service';
import { IncomeService } from './income.service';

@Component({
    selector: 'jhi-income-delete-dialog',
    templateUrl: './income-delete-dialog.component.html'
})
export class IncomeDeleteDialogComponent {

    income: Income;

    constructor(
        private incomeService: IncomeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.incomeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'incomeListModification',
                content: 'Deleted an income'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-income-delete-popup',
    template: ''
})
export class IncomeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private incomePopupService: IncomePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.incomePopupService
                .open(IncomeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
