import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgileManagerSharedModule } from '../../shared';
import {
    TaskListService,
    TaskListPopupService,
    TaskListComponent,
    TaskListDetailComponent,
    TaskListDialogComponent,
    TaskListPopupComponent,
    TaskListDeletePopupComponent,
    TaskListDeleteDialogComponent,
    taskListRoute,
    taskListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...taskListRoute,
    ...taskListPopupRoute,
];

@NgModule({
    imports: [
        AgileManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TaskListComponent,
        TaskListDetailComponent,
        TaskListDialogComponent,
        TaskListDeleteDialogComponent,
        TaskListPopupComponent,
        TaskListDeletePopupComponent,
    ],
    entryComponents: [
        TaskListComponent,
        TaskListDialogComponent,
        TaskListPopupComponent,
        TaskListDeleteDialogComponent,
        TaskListDeletePopupComponent,
    ],
    providers: [
        TaskListService,
        TaskListPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgileManagerTaskListModule {}
