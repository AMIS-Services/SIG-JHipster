/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { TaskMySuffixDetailComponent } from 'app/entities/task-my-suffix/task-my-suffix-detail.component';
import { TaskMySuffix } from 'app/shared/model/task-my-suffix.model';

describe('Component Tests', () => {
    describe('TaskMySuffix Management Detail Component', () => {
        let comp: TaskMySuffixDetailComponent;
        let fixture: ComponentFixture<TaskMySuffixDetailComponent>;
        const route = ({ data: of({ task: new TaskMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [TaskMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaskMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaskMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.task).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
