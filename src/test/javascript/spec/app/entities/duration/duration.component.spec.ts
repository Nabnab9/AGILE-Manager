/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgileManagerTestModule } from '../../../test.module';
import { DurationComponent } from '../../../../../../main/webapp/app/entities/duration/duration.component';
import { DurationService } from '../../../../../../main/webapp/app/entities/duration/duration.service';
import { Duration } from '../../../../../../main/webapp/app/entities/duration/duration.model';

describe('Component Tests', () => {

    describe('Duration Management Component', () => {
        let comp: DurationComponent;
        let fixture: ComponentFixture<DurationComponent>;
        let service: DurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [DurationComponent],
                providers: [
                    DurationService
                ]
            })
            .overrideTemplate(DurationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Duration(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.durations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
