import { HomeComponent } from './';
import {ProjectPageComponent} from '../core/pages/project-page/project-page.component';
import {Routes} from '@angular/router';

export const HOME_ROUTE: Routes = [{
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
},
    { path: 'project-list', component: ProjectPageComponent },];
