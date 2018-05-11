/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgileManagerTestModule } from '../../../test.module';
import { CheckItemComponent } from '../../../../../../main/webapp/app/entities/check-item/check-item.component';
import { CheckItemService } from '../../../../../../main/webapp/app/entities/check-item/check-item.service';
import { CheckItem } from '../../../../../../main/webapp/app/entities/check-item/check-item.model';

describe('Component Tests', () => {

    describe('CheckItem Management Component', () => {
        let comp: CheckItemComponent;
        let fixture: ComponentFixture<CheckItemComponent>;
        let service: CheckItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [CheckItemComponent],
                providers: [
                    CheckItemService
                ]
            })
            .overrideTemplate(CheckItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CheckItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CheckItem(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.checkItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
