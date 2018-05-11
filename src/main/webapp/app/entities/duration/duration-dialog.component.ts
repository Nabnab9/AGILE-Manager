import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Duration } from './duration.model';
import { DurationPopupService } from './duration-popup.service';
import { DurationService } from './duration.service';
import { Task, TaskService } from '../task';

@Component({
    selector: 'jhi-duration-dialog',
    templateUrl: './duration-dialog.component.html'
})
export class DurationDialogComponent implements OnInit {

    duration: Duration;
    isSaving: boolean;

    tasks: Task[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private durationService: DurationService,
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
        if (this.duration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.durationService.update(this.duration));
        } else {
            this.subscribeToSaveResponse(
                this.durationService.create(this.duration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Duration>>) {
        result.subscribe((res: HttpResponse<Duration>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Duration) {
        this.eventManager.broadcast({ name: 'durationListModification', content: 'OK'});
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
    selector: 'jhi-duration-popup',
    template: ''
})
export class DurationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private durationPopupService: DurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.durationPopupService
                    .open(DurationDialogComponent as Component, params['id']);
            } else {
                this.durationPopupService
                    .open(DurationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
