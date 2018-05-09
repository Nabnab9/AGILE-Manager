import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TagList } from './tag-list.model';
import { TagListPopupService } from './tag-list-popup.service';
import { TagListService } from './tag-list.service';
import { Task, TaskService } from '../task';

@Component({
    selector: 'jhi-tag-list-dialog',
    templateUrl: './tag-list-dialog.component.html'
})
export class TagListDialogComponent implements OnInit {

    tagList: TagList;
    isSaving: boolean;

    tasks: Task[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tagListService: TagListService,
        private taskService: TaskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.taskService.query()
            .subscribe((res: HttpResponse<Task[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tagList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tagListService.update(this.tagList));
        } else {
            this.subscribeToSaveResponse(
                this.tagListService.create(this.tagList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TagList>>) {
        result.subscribe((res: HttpResponse<TagList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TagList) {
        this.eventManager.broadcast({ name: 'tagListListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTaskById(index: number, item: Task) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tag-list-popup',
    template: ''
})
export class TagListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagListPopupService: TagListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tagListPopupService
                    .open(TagListDialogComponent as Component, params['id']);
            } else {
                this.tagListPopupService
                    .open(TagListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
