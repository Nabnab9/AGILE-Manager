/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgileManagerTestModule } from '../../../test.module';
import { TaskListComponent } from '../../../../../../main/webapp/app/entities/task-list/task-list.component';
import { TaskListService } from '../../../../../../main/webapp/app/entities/task-list/task-list.service';
import { TaskList } from '../../../../../../main/webapp/app/entities/task-list/task-list.model';

describe('Component Tests', () => {

    describe('TaskList Management Component', () => {
        let comp: TaskListComponent;
        let fixture: ComponentFixture<TaskListComponent>;
        let service: TaskListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [TaskListComponent],
                providers: [
                    TaskListService
                ]
            })
            .overrideTemplate(TaskListComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TaskList(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.taskLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
