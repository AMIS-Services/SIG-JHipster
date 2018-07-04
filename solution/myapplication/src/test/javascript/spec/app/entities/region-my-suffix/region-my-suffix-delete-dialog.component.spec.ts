/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyapplicationTestModule } from '../../../test.module';
import { RegionMySuffixDeleteDialogComponent } from 'app/entities/region-my-suffix/region-my-suffix-delete-dialog.component';
import { RegionMySuffixService } from 'app/entities/region-my-suffix/region-my-suffix.service';

describe('Component Tests', () => {
    describe('RegionMySuffix Management Delete Component', () => {
        let comp: RegionMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RegionMySuffixDeleteDialogComponent>;
        let service: RegionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [RegionMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(RegionMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegionMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionMySuffixService);
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
