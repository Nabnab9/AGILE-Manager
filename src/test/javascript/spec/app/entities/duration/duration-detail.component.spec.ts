/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AgileManagerTestModule } from '../../../test.module';
import { DurationDetailComponent } from '../../../../../../main/webapp/app/entities/duration/duration-detail.component';
import { DurationService } from '../../../../../../main/webapp/app/entities/duration/duration.service';
import { Duration } from '../../../../../../main/webapp/app/entities/duration/duration.model';

describe('Component Tests', () => {

    describe('Duration Management Detail Component', () => {
        let comp: DurationDetailComponent;
        let fixture: ComponentFixture<DurationDetailComponent>;
        let service: DurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [DurationDetailComponent],
                providers: [
                    DurationService
                ]
            })
            .overrideTemplate(DurationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DurationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Duration(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.duration).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
