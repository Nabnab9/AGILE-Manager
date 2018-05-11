import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Duration } from './duration.model';
import { DurationService } from './duration.service';

@Component({
    selector: 'jhi-duration-detail',
    templateUrl: './duration-detail.component.html'
})
export class DurationDetailComponent implements OnInit, OnDestroy {

    duration: Duration;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private durationService: DurationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDurations();
    }

    load(id) {
        this.durationService.find(id)
            .subscribe((durationResponse: HttpResponse<Duration>) => {
                this.duration = durationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDurations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'durationListModification',
            (response) => this.load(this.duration.id)
        );
    }
}
