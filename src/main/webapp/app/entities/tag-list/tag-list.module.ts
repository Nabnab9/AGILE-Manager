import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgileManagerSharedModule } from '../../shared';
import {
    TagListService,
    TagListPopupService,
    TagListComponent,
    TagListDetailComponent,
    TagListDialogComponent,
    TagListPopupComponent,
    TagListDeletePopupComponent,
    TagListDeleteDialogComponent,
    tagListRoute,
    tagListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tagListRoute,
    ...tagListPopupRoute,
];

@NgModule({
    imports: [
        AgileManagerSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagListComponent,
        TagListDetailComponent,
        TagListDialogComponent,
        TagListDeleteDialogComponent,
        TagListPopupComponent,
        TagListDeletePopupComponent,
    ],
    entryComponents: [
        TagListComponent,
        TagListDialogComponent,
        TagListPopupComponent,
        TagListDeleteDialogComponent,
        TagListDeletePopupComponent,
    ],
    providers: [
        TagListService,
        TagListPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgileManagerTagListModule {}
