import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ExpenseComponent } from './expense.component';
import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpensePopupComponent } from './expense-dialog.component';
import { ExpenseDeletePopupComponent } from './expense-delete-dialog.component';

export const expenseRoute: Routes = [
    {
        path: 'expense',
        component: ExpenseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'expense/:id',
        component: ExpenseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expensePopupRoute: Routes = [
    {
        path: 'expense-new',
        component: ExpensePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expense/:id/edit',
        component: ExpensePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expense/:id/delete',
        component: ExpenseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.expense.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
