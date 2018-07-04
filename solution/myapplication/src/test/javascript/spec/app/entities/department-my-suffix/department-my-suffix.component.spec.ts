/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyapplicationTestModule } from '../../../test.module';
import { DepartmentMySuffixComponent } from 'app/entities/department-my-suffix/department-my-suffix.component';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/department-my-suffix.service';
import { DepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';

describe('Component Tests', () => {
    describe('DepartmentMySuffix Management Component', () => {
        let comp: DepartmentMySuffixComponent;
        let fixture: ComponentFixture<DepartmentMySuffixComponent>;
        let service: DepartmentMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [DepartmentMySuffixComponent],
                providers: []
            })
                .overrideTemplate(DepartmentMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DepartmentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DepartmentMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
