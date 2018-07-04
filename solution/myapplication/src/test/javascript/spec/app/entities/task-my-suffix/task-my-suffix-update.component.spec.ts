/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { TaskMySuffixUpdateComponent } from 'app/entities/task-my-suffix/task-my-suffix-update.component';
import { TaskMySuffixService } from 'app/entities/task-my-suffix/task-my-suffix.service';
import { TaskMySuffix } from 'app/shared/model/task-my-suffix.model';

describe('Component Tests', () => {
    describe('TaskMySuffix Management Update Component', () => {
        let comp: TaskMySuffixUpdateComponent;
        let fixture: ComponentFixture<TaskMySuffixUpdateComponent>;
        let service: TaskMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [TaskMySuffixUpdateComponent]
            })
                .overrideTemplate(TaskMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TaskMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.task = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TaskMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.task = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
