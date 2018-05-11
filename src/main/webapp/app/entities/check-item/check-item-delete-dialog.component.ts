import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CheckItem } from './check-item.model';
import { CheckItemPopupService } from './check-item-popup.service';
import { CheckItemService } from './check-item.service';

@Component({
    selector: 'jhi-check-item-delete-dialog',
    templateUrl: './check-item-delete-dialog.component.html'
})
export class CheckItemDeleteDialogComponent {

    checkItem: CheckItem;

    constructor(
        private checkItemService: CheckItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.checkItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'checkItemListModification',
                content: 'Deleted an checkItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-check-item-delete-popup',
    template: ''
})
export class CheckItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private checkItemPopupService: CheckItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.checkItemPopupService
                .open(CheckItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
