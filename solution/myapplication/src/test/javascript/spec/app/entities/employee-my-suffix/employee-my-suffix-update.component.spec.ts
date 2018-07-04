/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { EmployeeMySuffixUpdateComponent } from 'app/entities/employee-my-suffix/employee-my-suffix-update.component';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/employee-my-suffix.service';
import { EmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

describe('Component Tests', () => {
    describe('EmployeeMySuffix Management Update Component', () => {
        let comp: EmployeeMySuffixUpdateComponent;
        let fixture: ComponentFixture<EmployeeMySuffixUpdateComponent>;
        let service: EmployeeMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [EmployeeMySuffixUpdateComponent]
            })
                .overrideTemplate(EmployeeMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmployeeMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmployeeMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employee = entity;
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
                    const entity = new EmployeeMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.employee = entity;
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
