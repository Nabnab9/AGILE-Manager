import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TagListComponent } from './tag-list.component';
import { TagListDetailComponent } from './tag-list-detail.component';
import { TagListPopupComponent } from './tag-list-dialog.component';
import { TagListDeletePopupComponent } from './tag-list-delete-dialog.component';

export const tagListRoute: Routes = [
    {
        path: 'tag-list',
        component: TagListComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.tagList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tag-list/:id',
        component: TagListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.tagList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tagListPopupRoute: Routes = [
    {
        path: 'tag-list-new',
        component: TagListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.tagList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tag-list/:id/edit',
        component: TagListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.tagList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tag-list/:id/delete',
        component: TagListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'agileManagerApp.tagList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
