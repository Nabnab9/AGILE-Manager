import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CheckItemComponent } from './check-item.component';
import { CheckItemDetailComponent } from './check-item-detail.component';
import { CheckItemPopupComponent } from './check-item-dialog.component';
import { CheckItemDeletePopupComponent } from './check-item-delete-dialog.component';

export const checkItemRoute: Routes = [
    {
        path: 'check-item',
        component: CheckItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'check-item/:id',
        component: CheckItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const checkItemPopupRoute: Routes = [
    {
        path: 'check-item-new',
        component: CheckItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'check-item/:id/edit',
        component: CheckItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'check-item/:id/delete',
        component: CheckItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.checkItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
