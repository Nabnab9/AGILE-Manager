import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CheckList } from './check-list.model';
import { CheckListPopupService } from './check-list-popup.service';
import { CheckListService } from './check-list.service';
import { Task, TaskService } from '../task';

@Component({
    selector: 'jhi-check-list-dialog',
    templateUrl: './check-list-dialog.component.html'
})
export class CheckListDialogComponent implements OnInit {

    checkList: CheckList;
    isSaving: boolean;

    tasks: Task[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private checkListService: CheckListService,
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
        if (this.checkList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.checkListService.update(this.checkList));
        } else {
            this.subscribeToSaveResponse(
                this.checkListService.create(this.checkList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CheckList>>) {
        result.subscribe((res: HttpResponse<CheckList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CheckList) {
        this.eventManager.broadcast({ name: 'checkListListModification', content: 'OK'});
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
    selector: 'jhi-check-list-popup',
    template: ''
})
export class CheckListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private checkListPopupService: CheckListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.checkListPopupService
                    .open(CheckListDialogComponent as Component, params['id']);
            } else {
                this.checkListPopupService
                    .open(CheckListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
