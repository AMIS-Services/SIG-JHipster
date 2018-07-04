/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MyapplicationTestModule } from '../../../test.module';
import { CountryMySuffixDeleteDialogComponent } from 'app/entities/country-my-suffix/country-my-suffix-delete-dialog.component';
import { CountryMySuffixService } from 'app/entities/country-my-suffix/country-my-suffix.service';

describe('Component Tests', () => {
    describe('CountryMySuffix Management Delete Component', () => {
        let comp: CountryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CountryMySuffixDeleteDialogComponent>;
        let service: CountryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [CountryMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CountryMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryMySuffixService);
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
