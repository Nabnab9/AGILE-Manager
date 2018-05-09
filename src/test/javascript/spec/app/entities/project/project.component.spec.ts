/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgileManagerTestModule } from '../../../test.module';
import { ProjectComponent } from '../../../../../../main/webapp/app/entities/project/project.component';
import { ProjectService } from '../../../../../../main/webapp/app/entities/project/project.service';
import { Project } from '../../../../../../main/webapp/app/entities/project/project.model';

describe('Component Tests', () => {

    describe('Project Management Component', () => {
        let comp: ProjectComponent;
        let fixture: ComponentFixture<ProjectComponent>;
        let service: ProjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [ProjectComponent],
                providers: [
                    ProjectService
                ]
            })
            .overrideTemplate(ProjectComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Project(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.projects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
