import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Sprint } from './sprint.model';
import { SprintPopupService } from './sprint-popup.service';
import { SprintService } from './sprint.service';

@Component({
    selector: 'jhi-sprint-delete-dialog',
    templateUrl: './sprint-delete-dialog.component.html'
})
export class SprintDeleteDialogComponent {

    sprint: Sprint;

    constructor(
        private sprintService: SprintService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sprintService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sprintListModification',
                content: 'Deleted an sprint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sprint-delete-popup',
    template: ''
})
export class SprintDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sprintPopupService: SprintPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sprintPopupService
                .open(SprintDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
