import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TagList } from './tag-list.model';
import { TagListPopupService } from './tag-list-popup.service';
import { TagListService } from './tag-list.service';

@Component({
    selector: 'jhi-tag-list-delete-dialog',
    templateUrl: './tag-list-delete-dialog.component.html'
})
export class TagListDeleteDialogComponent {

    tagList: TagList;

    constructor(
        private tagListService: TagListService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tagListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tagListListModification',
                content: 'Deleted an tagList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tag-list-delete-popup',
    template: ''
})
export class TagListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagListPopupService: TagListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tagListPopupService
                .open(TagListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
