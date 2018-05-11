/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AgileManagerTestModule } from '../../../test.module';
import { TagListDetailComponent } from '../../../../../../main/webapp/app/entities/tag-list/tag-list-detail.component';
import { TagListService } from '../../../../../../main/webapp/app/entities/tag-list/tag-list.service';
import { TagList } from '../../../../../../main/webapp/app/entities/tag-list/tag-list.model';

describe('Component Tests', () => {

    describe('TagList Management Detail Component', () => {
        let comp: TagListDetailComponent;
        let fixture: ComponentFixture<TagListDetailComponent>;
        let service: TagListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [TagListDetailComponent],
                providers: [
                    TagListService
                ]
            })
            .overrideTemplate(TagListDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagListDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TagList(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tagList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
