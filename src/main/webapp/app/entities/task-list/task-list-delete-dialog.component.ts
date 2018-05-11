import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TaskList } from './task-list.model';
import { TaskListPopupService } from './task-list-popup.service';
import { TaskListService } from './task-list.service';

@Component({
    selector: 'jhi-task-list-delete-dialog',
    templateUrl: './task-list-delete-dialog.component.html'
})
export class TaskListDeleteDialogComponent {

    taskList: TaskList;

    constructor(
        private taskListService: TaskListService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taskListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'taskListListModification',
                content: 'Deleted an taskList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-task-list-delete-popup',
    template: ''
})
export class TaskListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskListPopupService: TaskListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.taskListPopupService
                .open(TaskListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
