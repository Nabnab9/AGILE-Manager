/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AgileManagerTestModule } from '../../../test.module';
import { CheckListDetailComponent } from '../../../../../../main/webapp/app/entities/check-list/check-list-detail.component';
import { CheckListService } from '../../../../../../main/webapp/app/entities/check-list/check-list.service';
import { CheckList } from '../../../../../../main/webapp/app/entities/check-list/check-list.model';

describe('Component Tests', () => {

    describe('CheckList Management Detail Component', () => {
        let comp: CheckListDetailComponent;
        let fixture: ComponentFixture<CheckListDetailComponent>;
        let service: CheckListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [CheckListDetailComponent],
                providers: [
                    CheckListService
                ]
            })
            .overrideTemplate(CheckListDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckListDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CheckListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CheckList(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.checkList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
