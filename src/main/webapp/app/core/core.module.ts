import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import {AgileManagerSharedModule} from '../shared';

@NgModule({
  imports: [
    CommonModule,
      AgileManagerSharedModule
  ],
  declarations: [ProjectSummaryComponent, ProjectPageComponent]
})
export class CoreModule { }
