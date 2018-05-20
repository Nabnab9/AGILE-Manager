import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import {AgileManagerSharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import { ProjectComponent } from './components/project/project.component';

@NgModule({
  imports: [
    CommonModule,
      AgileManagerSharedModule,
      RouterModule
  ],
  declarations: [
      ProjectSummaryComponent,
      ProjectPageComponent,
      ProjectComponent
  ]
})
export class CoreModule { }
