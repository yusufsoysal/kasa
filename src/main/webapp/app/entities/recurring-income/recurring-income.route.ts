import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RecurringIncomeComponent } from './recurring-income.component';
import { RecurringIncomeDetailComponent } from './recurring-income-detail.component';
import { RecurringIncomePopupComponent } from './recurring-income-dialog.component';
import { RecurringIncomeDeletePopupComponent } from './recurring-income-delete-dialog.component';

export const recurringIncomeRoute: Routes = [
    {
        path: 'recurring-income',
        component: RecurringIncomeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.recurringIncome.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'recurring-income/:id',
        component: RecurringIncomeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.recurringIncome.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recurringIncomePopupRoute: Routes = [
    {
        path: 'recurring-income-new',
        component: RecurringIncomePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.recurringIncome.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recurring-income/:id/edit',
        component: RecurringIncomePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.recurringIncome.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recurring-income/:id/delete',
        component: RecurringIncomeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.recurringIncome.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
