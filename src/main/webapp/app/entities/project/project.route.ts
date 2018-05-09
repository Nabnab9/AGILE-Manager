import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectPopupComponent } from './project-dialog.component';
import { ProjectDeletePopupComponent } from './project-delete-dialog.component';

export const projectRoute: Routes = [
    {
        path: 'project',
        component: ProjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'project/:id',
        component: ProjectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectPopupRoute: Routes = [
    {
        path: 'project-new',
        component: ProjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project/:id/edit',
        component: ProjectPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project/:id/delete',
        component: ProjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
