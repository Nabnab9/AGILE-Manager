import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CheckList } from './check-list.model';
import { CheckListService } from './check-list.service';

@Component({
    selector: 'jhi-check-list-detail',
    templateUrl: './check-list-detail.component.html'
})
export class CheckListDetailComponent implements OnInit, OnDestroy {

    checkList: CheckList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private checkListService: CheckListService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCheckLists();
    }

    load(id) {
        this.checkListService.find(id)
            .subscribe((checkListResponse: HttpResponse<CheckList>) => {
                this.checkList = checkListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCheckLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'checkListListModification',
            (response) => this.load(this.checkList.id)
        );
    }
}
