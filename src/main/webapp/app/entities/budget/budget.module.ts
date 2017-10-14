import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KasaSharedModule } from '../../shared';
import {
    BudgetService,
    BudgetPopupService,
    BudgetComponent,
    BudgetDetailComponent,
    BudgetDialogComponent,
    BudgetPopupComponent,
    BudgetDeletePopupComponent,
    BudgetDeleteDialogComponent,
    budgetRoute,
    budgetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...budgetRoute,
    ...budgetPopupRoute,
];

@NgModule({
    imports: [
        KasaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BudgetComponent,
        BudgetDetailComponent,
        BudgetDialogComponent,
        BudgetDeleteDialogComponent,
        BudgetPopupComponent,
        BudgetDeletePopupComponent,
    ],
    entryComponents: [
        BudgetComponent,
        BudgetDialogComponent,
        BudgetPopupComponent,
        BudgetDeleteDialogComponent,
        BudgetDeletePopupComponent,
    ],
    providers: [
        BudgetService,
        BudgetPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KasaBudgetModule {}
