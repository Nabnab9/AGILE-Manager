/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AgileManagerTestModule } from '../../../test.module';
import { SprintDetailComponent } from '../../../../../../main/webapp/app/entities/sprint/sprint-detail.component';
import { SprintService } from '../../../../../../main/webapp/app/entities/sprint/sprint.service';
import { Sprint } from '../../../../../../main/webapp/app/entities/sprint/sprint.model';

describe('Component Tests', () => {

    describe('Sprint Management Detail Component', () => {
        let comp: SprintDetailComponent;
        let fixture: ComponentFixture<SprintDetailComponent>;
        let service: SprintService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [SprintDetailComponent],
                providers: [
                    SprintService
                ]
            })
            .overrideTemplate(SprintDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SprintDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SprintService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Sprint(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sprint).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
