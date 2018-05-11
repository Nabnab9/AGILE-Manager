import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TagList } from './tag-list.model';
import { TagListService } from './tag-list.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tag-list',
    templateUrl: './tag-list.component.html'
})
export class TagListComponent implements OnInit, OnDestroy {
tagLists: TagList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tagListService: TagListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tagListService.query().subscribe(
            (res: HttpResponse<TagList[]>) => {
                this.tagLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTagLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TagList) {
        return item.id;
    }
    registerChangeInTagLists() {
        this.eventSubscriber = this.eventManager.subscribe('tagListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
