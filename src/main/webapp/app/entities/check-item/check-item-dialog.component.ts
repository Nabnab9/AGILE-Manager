import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CheckItem } from './check-item.model';
import { CheckItemPopupService } from './check-item-popup.service';
import { CheckItemService } from './check-item.service';
import { CheckList, CheckListService } from '../check-list';

@Component({
    selector: 'jhi-check-item-dialog',
    templateUrl: './check-item-dialog.component.html'
})
export class CheckItemDialogComponent implements OnInit {

    checkItem: CheckItem;
    isSaving: boolean;

    checklists: CheckList[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private checkItemService: CheckItemService,
        private checkListService: CheckListService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.checkListService.query()
            .subscribe((res: HttpResponse<CheckList[]>) => { this.checklists = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.checkItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.checkItemService.update(this.checkItem));
        } else {
            this.subscribeToSaveResponse(
                this.checkItemService.create(this.checkItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CheckItem>>) {
        result.subscribe((res: HttpResponse<CheckItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CheckItem) {
        this.eventManager.broadcast({ name: 'checkItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCheckListById(index: number, item: CheckList) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-check-item-popup',
    template: ''
})
export class CheckItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private checkItemPopupService: CheckItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.checkItemPopupService
                    .open(CheckItemDialogComponent as Component, params['id']);
            } else {
                this.checkItemPopupService
                    .open(CheckItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
