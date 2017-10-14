import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { KasaCircleModule } from './circle/circle.module';
import { KasaCategoryModule } from './category/category.module';
import { KasaExpenseModule } from './expense/expense.module';
import { KasaBudgetModule } from './budget/budget.module';
import { KasaIncomeModule } from './income/income.module';
import { KasaRecurringIncomeModule } from './recurring-income/recurring-income.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        KasaCircleModule,
        KasaCategoryModule,
        KasaExpenseModule,
        KasaBudgetModule,
        KasaIncomeModule,
        KasaRecurringIncomeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KasaEntityModule {}
