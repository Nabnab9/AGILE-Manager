import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CheckList } from './check-list.model';
import { CheckListPopupService } from './check-list-popup.service';
import { CheckListService } from './check-list.service';

@Component({
    selector: 'jhi-check-list-delete-dialog',
    templateUrl: './check-list-delete-dialog.component.html'
})
export class CheckListDeleteDialogComponent {

    checkList: CheckList;

    constructor(
        private checkListService: CheckListService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.checkListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'checkListListModification',
                content: 'Deleted an checkList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-check-list-delete-popup',
    template: ''
})
export class CheckListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private checkListPopupService: CheckListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.checkListPopupService
                .open(CheckListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
