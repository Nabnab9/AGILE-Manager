import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Sprint } from './sprint.model';
import { SprintService } from './sprint.service';

@Injectable()
export class SprintPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sprintService: SprintService

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
                this.sprintService.find(id)
                    .subscribe((sprintResponse: HttpResponse<Sprint>) => {
                        const sprint: Sprint = sprintResponse.body;
                        if (sprint.startDate) {
                            sprint.startDate = {
                                year: sprint.startDate.getFullYear(),
                                month: sprint.startDate.getMonth() + 1,
                                day: sprint.startDate.getDate()
                            };
                        }
                        if (sprint.endDate) {
                            sprint.endDate = {
                                year: sprint.endDate.getFullYear(),
                                month: sprint.endDate.getMonth() + 1,
                                day: sprint.endDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.sprintModalRef(component, sprint);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sprintModalRef(component, new Sprint());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sprintModalRef(component: Component, sprint: Sprint): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sprint = sprint;
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
