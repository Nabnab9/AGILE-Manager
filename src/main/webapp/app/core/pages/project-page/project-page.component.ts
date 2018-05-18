import { Component, OnInit } from '@angular/core';
import {Project, ProjectService} from '../../../entities/project';
import {Account, Principal} from '../../../shared';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService} from 'ng-jhipster';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'jhi-project-page',
  templateUrl: './project-page.component.html',
  styles: []
})
export class ProjectPageComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    projects: Project [];

    constructor(private principal: Principal,
                private projectService: ProjectService,
                private jhiAlertService: JhiAlertService) { }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            if (this.account !== null) {
                this.projectService.findProjectsByUserLogin(this.account.login).subscribe(
                    (res: HttpResponse<Project[]>) => {
                        this.projects = res.body;
                        console.log(this.projects);
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });
  }

    private onError(error) {
        console.log(error);
        this.jhiAlertService.error(error.message, null, null);
    }

}
