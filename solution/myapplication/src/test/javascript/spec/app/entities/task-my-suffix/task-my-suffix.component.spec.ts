/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyapplicationTestModule } from '../../../test.module';
import { TaskMySuffixComponent } from 'app/entities/task-my-suffix/task-my-suffix.component';
import { TaskMySuffixService } from 'app/entities/task-my-suffix/task-my-suffix.service';
import { TaskMySuffix } from 'app/shared/model/task-my-suffix.model';

describe('Component Tests', () => {
    describe('TaskMySuffix Management Component', () => {
        let comp: TaskMySuffixComponent;
        let fixture: ComponentFixture<TaskMySuffixComponent>;
        let service: TaskMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [TaskMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TaskMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TaskMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
