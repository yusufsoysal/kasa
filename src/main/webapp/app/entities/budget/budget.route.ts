import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BudgetComponent } from './budget.component';
import { BudgetDetailComponent } from './budget-detail.component';
import { BudgetPopupComponent } from './budget-dialog.component';
import { BudgetDeletePopupComponent } from './budget-delete-dialog.component';

export const budgetRoute: Routes = [
    {
        path: 'budget',
        component: BudgetComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.budget.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'budget/:id',
        component: BudgetDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.budget.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const budgetPopupRoute: Routes = [
    {
        path: 'budget-new',
        component: BudgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.budget.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'budget/:id/edit',
        component: BudgetPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.budget.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'budget/:id/delete',
        component: BudgetDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.budget.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
