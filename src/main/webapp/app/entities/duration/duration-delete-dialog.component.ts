import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Duration } from './duration.model';
import { DurationPopupService } from './duration-popup.service';
import { DurationService } from './duration.service';

@Component({
    selector: 'jhi-duration-delete-dialog',
    templateUrl: './duration-delete-dialog.component.html'
})
export class DurationDeleteDialogComponent {

    duration: Duration;

    constructor(
        private durationService: DurationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.durationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'durationListModification',
                content: 'Deleted an duration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-duration-delete-popup',
    template: ''
})
export class DurationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private durationPopupService: DurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.durationPopupService
                .open(DurationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
