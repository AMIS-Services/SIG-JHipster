/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyapplicationTestModule } from '../../../test.module';
import { JobMySuffixDeleteDialogComponent } from 'app/entities/job-my-suffix/job-my-suffix-delete-dialog.component';
import { JobMySuffixService } from 'app/entities/job-my-suffix/job-my-suffix.service';

describe('Component Tests', () => {
    describe('JobMySuffix Management Delete Component', () => {
        let comp: JobMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<JobMySuffixDeleteDialogComponent>;
        let service: JobMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [JobMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(JobMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobMySuffixService);
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
