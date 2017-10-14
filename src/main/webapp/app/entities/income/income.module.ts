import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KasaSharedModule } from '../../shared';
import {
    IncomeService,
    IncomePopupService,
    IncomeComponent,
    IncomeDetailComponent,
    IncomeDialogComponent,
    IncomePopupComponent,
    IncomeDeletePopupComponent,
    IncomeDeleteDialogComponent,
    incomeRoute,
    incomePopupRoute,
} from './';

const ENTITY_STATES = [
    ...incomeRoute,
    ...incomePopupRoute,
];

@NgModule({
    imports: [
        KasaSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IncomeComponent,
        IncomeDetailComponent,
        IncomeDialogComponent,
        IncomeDeleteDialogComponent,
        IncomePopupComponent,
        IncomeDeletePopupComponent,
    ],
    entryComponents: [
        IncomeComponent,
        IncomeDialogComponent,
        IncomePopupComponent,
        IncomeDeleteDialogComponent,
        IncomeDeletePopupComponent,
    ],
    providers: [
        IncomeService,
        IncomePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KasaIncomeModule {}
