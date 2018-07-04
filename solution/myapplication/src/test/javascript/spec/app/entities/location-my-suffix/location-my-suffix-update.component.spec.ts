/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { LocationMySuffixUpdateComponent } from 'app/entities/location-my-suffix/location-my-suffix-update.component';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/location-my-suffix.service';
import { LocationMySuffix } from 'app/shared/model/location-my-suffix.model';

describe('Component Tests', () => {
    describe('LocationMySuffix Management Update Component', () => {
        let comp: LocationMySuffixUpdateComponent;
        let fixture: ComponentFixture<LocationMySuffixUpdateComponent>;
        let service: LocationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [LocationMySuffixUpdateComponent]
            })
                .overrideTemplate(LocationMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LocationMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
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
                    const entity = new LocationMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.location = entity;
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
