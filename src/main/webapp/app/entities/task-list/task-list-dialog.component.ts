import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TaskList } from './task-list.model';
import { TaskListPopupService } from './task-list-popup.service';
import { TaskListService } from './task-list.service';
import { Sprint, SprintService } from '../sprint';

@Component({
    selector: 'jhi-task-list-dialog',
    templateUrl: './task-list-dialog.component.html'
})
export class TaskListDialogComponent implements OnInit {

    taskList: TaskList;
    isSaving: boolean;

    sprints: Sprint[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private taskListService: TaskListService,
        private sprintService: SprintService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sprintService.query()
            .subscribe((res: HttpResponse<Sprint[]>) => { this.sprints = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.taskList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taskListService.update(this.taskList));
        } else {
            this.subscribeToSaveResponse(
                this.taskListService.create(this.taskList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TaskList>>) {
        result.subscribe((res: HttpResponse<TaskList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TaskList) {
        this.eventManager.broadcast({ name: 'taskListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSprintById(index: number, item: Sprint) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-task-list-popup',
    template: ''
})
export class TaskListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskListPopupService: TaskListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taskListPopupService
                    .open(TaskListDialogComponent as Component, params['id']);
            } else {
                this.taskListPopupService
                    .open(TaskListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
