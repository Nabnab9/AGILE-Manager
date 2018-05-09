import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Sprint } from './sprint.model';
import { SprintService } from './sprint.service';

@Component({
    selector: 'jhi-sprint-detail',
    templateUrl: './sprint-detail.component.html'
})
export class SprintDetailComponent implements OnInit, OnDestroy {

    sprint: Sprint;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sprintService: SprintService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSprints();
    }

    load(id) {
        this.sprintService.find(id)
            .subscribe((sprintResponse: HttpResponse<Sprint>) => {
                this.sprint = sprintResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSprints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sprintListModification',
            (response) => this.load(this.sprint.id)
        );
    }
}
