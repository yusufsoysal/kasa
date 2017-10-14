import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KasaSharedModule } from '../../shared';
import {
    RecurringIncomeService,
    RecurringIncomePopupService,
    RecurringIncomeComponent,
    RecurringIncomeDetailComponent,
    RecurringIncomeDialogComponent,
    RecurringIncomePopupComponent,
    RecurringIncomeDeletePopupComponent,
    RecurringIncomeDeleteDialogComponent,
    recurringIncomeRoute,
    recurringIncomePopupRoute,
} from './';

const ENTITY_STATES = [
    ...recurringIncomeRoute,
    ...recurringIncomePopupRoute,
];

@NgModule({
    imports: [
        KasaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RecurringIncomeComponent,
        RecurringIncomeDetailComponent,
        RecurringIncomeDialogComponent,
        RecurringIncomeDeleteDialogComponent,
        RecurringIncomePopupComponent,
        RecurringIncomeDeletePopupComponent,
    ],
    entryComponents: [
        RecurringIncomeComponent,
        RecurringIncomeDialogComponent,
        RecurringIncomePopupComponent,
        RecurringIncomeDeleteDialogComponent,
        RecurringIncomeDeletePopupComponent,
    ],
    providers: [
        RecurringIncomeService,
        RecurringIncomePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KasaRecurringIncomeModule {}
