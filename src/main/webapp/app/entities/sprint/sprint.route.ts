import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SprintComponent } from './sprint.component';
import { SprintDetailComponent } from './sprint-detail.component';
import { SprintPopupComponent } from './sprint-dialog.component';
import { SprintDeletePopupComponent } from './sprint-delete-dialog.component';

export const sprintRoute: Routes = [
    {
        path: 'sprint',
        component: SprintComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sprint/:id',
        component: SprintDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sprintPopupRoute: Routes = [
    {
        path: 'sprint-new',
        component: SprintPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sprint/:id/edit',
        component: SprintPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sprint/:id/delete',
        component: SprintDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.sprint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
