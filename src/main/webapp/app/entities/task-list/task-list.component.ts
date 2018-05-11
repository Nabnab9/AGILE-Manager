import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TaskList } from './task-list.model';
import { TaskListService } from './task-list.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-task-list',
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit, OnDestroy {
taskLists: TaskList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private taskListService: TaskListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.taskListService.query().subscribe(
            (res: HttpResponse<TaskList[]>) => {
                this.taskLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTaskLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TaskList) {
        return item.id;
    }
    registerChangeInTaskLists() {
        this.eventSubscriber = this.eventManager.subscribe('taskListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
