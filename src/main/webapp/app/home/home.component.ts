import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Account, LoginModalService, Principal} from '../shared';
import {Project, ProjectService} from '../entities/project';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    projects: Project [];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private jhiAlertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            if (this.account !== null){
                this.projectService.findProjectsByUserLogin(this.account.login).subscribe(
                    (res: HttpResponse<Project[]>) => {
                        this.projects = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onError(error) {
        console.log(error);
        this.jhiAlertService.error(error.message, null, null);
    }
}
