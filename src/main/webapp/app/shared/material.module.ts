import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule
    ],
    declarations: [

    ],
    providers: [

    ],
    entryComponents: [],
    exports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        FlexLayoutModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AgileManagerMaterialModule {}
