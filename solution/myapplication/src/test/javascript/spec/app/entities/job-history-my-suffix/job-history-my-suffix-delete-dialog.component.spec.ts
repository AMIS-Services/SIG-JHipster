/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyapplicationTestModule } from '../../../test.module';
import { JobHistoryMySuffixDeleteDialogComponent } from 'app/entities/job-history-my-suffix/job-history-my-suffix-delete-dialog.component';
import { JobHistoryMySuffixService } from 'app/entities/job-history-my-suffix/job-history-my-suffix.service';

describe('Component Tests', () => {
    describe('JobHistoryMySuffix Management Delete Component', () => {
        let comp: JobHistoryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<JobHistoryMySuffixDeleteDialogComponent>;
        let service: JobHistoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [JobHistoryMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(JobHistoryMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobHistoryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryMySuffixService);
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
