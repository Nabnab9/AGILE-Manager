import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private projectService: ProjectService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.projectService.find(id)
                    .subscribe((projectResponse: HttpResponse<Project>) => {
                        const project: Project = projectResponse.body;
                        if (project.creationDate) {
                            project.creationDate = {
                                year: project.creationDate.getFullYear(),
                                month: project.creationDate.getMonth() + 1,
                                day: project.creationDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.projectModalRef(component, project);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.projectModalRef(component, new Project());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    projectModalRef(component: Component, project: Project): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.project = project;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
