import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { IncomeComponent } from './income.component';
import { IncomeDetailComponent } from './income-detail.component';
import { IncomePopupComponent } from './income-dialog.component';
import { IncomeDeletePopupComponent } from './income-delete-dialog.component';

export const incomeRoute: Routes = [
    {
        path: 'income',
        component: IncomeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.income.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'income/:id',
        component: IncomeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.income.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incomePopupRoute: Routes = [
    {
        path: 'income-new',
        component: IncomePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.income.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'income/:id/edit',
        component: IncomePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.income.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'income/:id/delete',
        component: IncomeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kasaApp.income.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
