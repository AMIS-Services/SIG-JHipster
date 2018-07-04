/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { EmployeeMySuffixDetailComponent } from 'app/entities/employee-my-suffix/employee-my-suffix-detail.component';
import { EmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

describe('Component Tests', () => {
    describe('EmployeeMySuffix Management Detail Component', () => {
        let comp: EmployeeMySuffixDetailComponent;
        let fixture: ComponentFixture<EmployeeMySuffixDetailComponent>;
        const route = ({ data: of({ employee: new EmployeeMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [EmployeeMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmployeeMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmployeeMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
