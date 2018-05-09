import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CheckItem } from './check-item.model';
import { CheckItemService } from './check-item.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-check-item',
    templateUrl: './check-item.component.html'
})
export class CheckItemComponent implements OnInit, OnDestroy {
checkItems: CheckItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private checkItemService: CheckItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.checkItemService.query().subscribe(
            (res: HttpResponse<CheckItem[]>) => {
                this.checkItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCheckItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CheckItem) {
        return item.id;
    }
    registerChangeInCheckItems() {
        this.eventSubscriber = this.eventManager.subscribe('checkItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
