/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AgileManagerTestModule } from '../../../test.module';
import { TaskListDetailComponent } from '../../../../../../main/webapp/app/entities/task-list/task-list-detail.component';
import { TaskListService } from '../../../../../../main/webapp/app/entities/task-list/task-list.service';
import { TaskList } from '../../../../../../main/webapp/app/entities/task-list/task-list.model';

describe('Component Tests', () => {

    describe('TaskList Management Detail Component', () => {
        let comp: TaskListDetailComponent;
        let fixture: ComponentFixture<TaskListDetailComponent>;
        let service: TaskListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AgileManagerTestModule],
                declarations: [TaskListDetailComponent],
                providers: [
                    TaskListService
                ]
            })
            .overrideTemplate(TaskListDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskListDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TaskList(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.taskList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
