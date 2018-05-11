/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgileManagerTestModule } from '../../../test.module';
import { CheckListComponent } from '../../../../../../main/webapp/app/entities/check-list/check-list.component';
import { CheckListService } from '../../../../../../main/webapp/app/entities/check-list/check-list.service';
import { CheckList } from '../../../../../../main/webapp/app/entities/check-list/check-list.model';

describe('Component Tests', () => {

    describe('CheckList Management Component', () => {
        let comp: CheckListComponent;
        let fixture: ComponentFixture<CheckListComponent>;
        let service: CheckListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [CheckListComponent],
                providers: [
                    CheckListService
                ]
            })
            .overrideTemplate(CheckListComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CheckListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CheckList(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.checkLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
