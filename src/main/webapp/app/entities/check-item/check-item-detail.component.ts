import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CheckItem } from './check-item.model';
import { CheckItemService } from './check-item.service';

@Component({
    selector: 'jhi-check-item-detail',
    templateUrl: './check-item-detail.component.html'
})
export class CheckItemDetailComponent implements OnInit, OnDestroy {

    checkItem: CheckItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private checkItemService: CheckItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCheckItems();
    }

    load(id) {
        this.checkItemService.find(id)
            .subscribe((checkItemResponse: HttpResponse<CheckItem>) => {
                this.checkItem = checkItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCheckItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'checkItemListModification',
            (response) => this.load(this.checkItem.id)
        );
    }
}
