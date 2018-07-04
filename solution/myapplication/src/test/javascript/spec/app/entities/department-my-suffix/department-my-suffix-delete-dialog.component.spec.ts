/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyapplicationTestModule } from '../../../test.module';
import { DepartmentMySuffixDeleteDialogComponent } from 'app/entities/department-my-suffix/department-my-suffix-delete-dialog.component';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/department-my-suffix.service';

describe('Component Tests', () => {
    describe('DepartmentMySuffix Management Delete Component', () => {
        let comp: DepartmentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DepartmentMySuffixDeleteDialogComponent>;
        let service: DepartmentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [DepartmentMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(DepartmentMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartmentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
