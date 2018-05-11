import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DurationComponent } from './duration.component';
import { DurationDetailComponent } from './duration-detail.component';
import { DurationPopupComponent } from './duration-dialog.component';
import { DurationDeletePopupComponent } from './duration-delete-dialog.component';

export const durationRoute: Routes = [
    {
        path: 'duration',
        component: DurationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.duration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'duration/:id',
        component: DurationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.duration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const durationPopupRoute: Routes = [
    {
        path: 'duration-new',
        component: DurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.duration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'duration/:id/edit',
        component: DurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.duration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'duration/:id/delete',
        component: DurationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.duration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
