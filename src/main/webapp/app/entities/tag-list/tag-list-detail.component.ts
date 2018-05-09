import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TagList } from './tag-list.model';
import { TagListService } from './tag-list.service';

@Component({
    selector: 'jhi-tag-list-detail',
    templateUrl: './tag-list-detail.component.html'
})
export class TagListDetailComponent implements OnInit, OnDestroy {

    tagList: TagList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tagListService: TagListService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTagLists();
    }

    load(id) {
        this.tagListService.find(id)
            .subscribe((tagListResponse: HttpResponse<TagList>) => {
                this.tagList = tagListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTagLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tagListListModification',
            (response) => this.load(this.tagList.id)
        );
    }
}
