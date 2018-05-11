import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgileManagerSharedModule } from '../../shared';
import {
    CheckListService,
    CheckListPopupService,
    CheckListComponent,
    CheckListDetailComponent,
    CheckListDialogComponent,
    CheckListPopupComponent,
    CheckListDeletePopupComponent,
    CheckListDeleteDialogComponent,
    checkListRoute,
    checkListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...checkListRoute,
    ...checkListPopupRoute,
];

@NgModule({
    imports: [
        AgileManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CheckListComponent,
        CheckListDetailComponent,
        CheckListDialogComponent,
        CheckListDeleteDialogComponent,
        CheckListPopupComponent,
        CheckListDeletePopupComponent,
    ],
    entryComponents: [
        CheckListComponent,
        CheckListDialogComponent,
        CheckListPopupComponent,
        CheckListDeleteDialogComponent,
        CheckListDeletePopupComponent,
    ],
    providers: [
        CheckListService,
        CheckListPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgileManagerCheckListModule {}
