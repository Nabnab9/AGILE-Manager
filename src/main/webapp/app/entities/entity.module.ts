import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AgileManagerUserExtraModule } from './user-extra/user-extra.module';
import { AgileManagerProjectModule } from './project/project.module';
import { AgileManagerSprintModule } from './sprint/sprint.module';
import { AgileManagerTaskListModule } from './task-list/task-list.module';
import { AgileManagerTaskModule } from './task/task.module';
import { AgileManagerDurationModule } from './duration/duration.module';
import { AgileManagerTagListModule } from './tag-list/tag-list.module';
import { AgileManagerTagModule } from './tag/tag.module';
import { AgileManagerCheckListModule } from './check-list/check-list.module';
import { AgileManagerCheckItemModule } from './check-item/check-item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AgileManagerUserExtraModule,
        AgileManagerProjectModule,
        AgileManagerSprintModule,
        AgileManagerTaskListModule,
        AgileManagerTaskModule,
        AgileManagerDurationModule,
        AgileManagerTagListModule,
        AgileManagerTagModule,
        AgileManagerCheckListModule,
        AgileManagerCheckItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgileManagerEntityModule {}
