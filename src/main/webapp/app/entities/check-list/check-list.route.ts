import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CheckListComponent } from './check-list.component';
import { CheckListDetailComponent } from './check-list-detail.component';
import { CheckListPopupComponent } from './check-list-dialog.component';
import { CheckListDeletePopupComponent } from './check-list-delete-dialog.component';

export const checkListRoute: Routes = [
    {
        path: 'check-list',
        component: CheckListComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'check-list/:id',
        component: CheckListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const checkListPopupRoute: Routes = [
    {
        path: 'check-list-new',
        component: CheckListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'check-list/:id/edit',
        component: CheckListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'check-list/:id/delete',
        component: CheckListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
