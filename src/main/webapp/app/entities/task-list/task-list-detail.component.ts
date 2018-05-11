import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TaskList } from './task-list.model';
import { TaskListService } from './task-list.service';

@Component({
    selector: 'jhi-task-list-detail',
    templateUrl: './task-list-detail.component.html'
})
export class TaskListDetailComponent implements OnInit, OnDestroy {

    taskList: TaskList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private taskListService: TaskListService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTaskLists();
    }

    load(id) {
        this.taskListService.find(id)
            .subscribe((taskListResponse: HttpResponse<TaskList>) => {
                this.taskList = taskListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTaskLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taskListListModification',
            (response) => this.load(this.taskList.id)
        );
    }
}
