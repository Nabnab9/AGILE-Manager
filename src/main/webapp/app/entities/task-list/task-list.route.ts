import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TaskListComponent } from './task-list.component';
import { TaskListDetailComponent } from './task-list-detail.component';
import { TaskListPopupComponent } from './task-list-dialog.component';
import { TaskListDeletePopupComponent } from './task-list-delete-dialog.component';

export const taskListRoute: Routes = [
    {
        path: 'task-list',
        component: TaskListComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.taskList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'task-list/:id',
        component: TaskListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.taskList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskListPopupRoute: Routes = [
    {
        path: 'task-list-new',
        component: TaskListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.taskList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-list/:id/edit',
        component: TaskListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.taskList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-list/:id/delete',
        component: TaskListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.taskList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
