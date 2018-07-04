/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyapplicationTestModule } from '../../../test.module';
import { LocationMySuffixDeleteDialogComponent } from 'app/entities/location-my-suffix/location-my-suffix-delete-dialog.component';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/location-my-suffix.service';

describe('Component Tests', () => {
    describe('LocationMySuffix Management Delete Component', () => {
        let comp: LocationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LocationMySuffixDeleteDialogComponent>;
        let service: LocationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [LocationMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LocationMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LocationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationMySuffixService);
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
