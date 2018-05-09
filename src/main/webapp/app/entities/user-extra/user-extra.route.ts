import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserExtraComponent } from './user-extra.component';
import { UserExtraDetailComponent } from './user-extra-detail.component';
import { UserExtraPopupComponent } from './user-extra-dialog.component';
import { UserExtraDeletePopupComponent } from './user-extra-delete-dialog.component';

export const userExtraRoute: Routes = [
    {
        path: 'user-extra',
        component: UserExtraComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.userExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-extra/:id',
        component: UserExtraDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.userExtra.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userExtraPopupRoute: Routes = [
    {
        path: 'user-extra-new',
        component: UserExtraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.userExtra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extra/:id/edit',
        component: UserExtraPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.userExtra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extra/:id/delete',
        component: UserExtraDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.userExtra.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
