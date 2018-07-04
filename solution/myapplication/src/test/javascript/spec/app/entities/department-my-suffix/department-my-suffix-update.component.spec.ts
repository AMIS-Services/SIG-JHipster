/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { DepartmentMySuffixUpdateComponent } from 'app/entities/department-my-suffix/department-my-suffix-update.component';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/department-my-suffix.service';
import { DepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';

describe('Component Tests', () => {
    describe('DepartmentMySuffix Management Update Component', () => {
        let comp: DepartmentMySuffixUpdateComponent;
        let fixture: ComponentFixture<DepartmentMySuffixUpdateComponent>;
        let service: DepartmentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [DepartmentMySuffixUpdateComponent]
            })
                .overrideTemplate(DepartmentMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DepartmentMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DepartmentMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.department = entity;
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
                    const entity = new DepartmentMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.department = entity;
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
