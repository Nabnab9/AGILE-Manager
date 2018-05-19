import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    AgileManagerSharedLibsModule,
    AgileManagerSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
} from './';
import {AgileManagerMaterialModule} from './material.module';


@NgModule({
    imports: [
        AgileManagerSharedLibsModule,
        AgileManagerSharedCommonModule,
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe,
        AgileManagerMaterialModule,
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        AgileManagerSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        AgileManagerMaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AgileManagerSharedModule {}
