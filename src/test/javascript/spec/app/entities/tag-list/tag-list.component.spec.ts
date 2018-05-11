/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgileManagerTestModule } from '../../../test.module';
import { TagListComponent } from '../../../../../../main/webapp/app/entities/tag-list/tag-list.component';
import { TagListService } from '../../../../../../main/webapp/app/entities/tag-list/tag-list.service';
import { TagList } from '../../../../../../main/webapp/app/entities/tag-list/tag-list.model';

describe('Component Tests', () => {

    describe('TagList Management Component', () => {
        let comp: TagListComponent;
        let fixture: ComponentFixture<TagListComponent>;
        let service: TagListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [TagListComponent],
                providers: [
                    TagListService
                ]
            })
            .overrideTemplate(TagListComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TagList(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tagLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
