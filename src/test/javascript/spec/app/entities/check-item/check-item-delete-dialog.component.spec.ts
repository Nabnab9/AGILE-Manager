/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AgileManagerTestModule } from '../../../test.module';
import { CheckItemDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/check-item/check-item-delete-dialog.component';
import { CheckItemService } from '../../../../../../main/webapp/app/entities/check-item/check-item.service';

describe('Component Tests', () => {

    describe('CheckItem Management Delete Component', () => {
        let comp: CheckItemDeleteDialogComponent;
        let fixture: ComponentFixture<CheckItemDeleteDialogComponent>;
        let service: CheckItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [CheckItemDeleteDialogComponent],
                providers: [
                    CheckItemService
                ]
            })
            .overrideTemplate(CheckItemDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CheckItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
