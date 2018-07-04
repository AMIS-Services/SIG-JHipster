/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { CountryMySuffixUpdateComponent } from 'app/entities/country-my-suffix/country-my-suffix-update.component';
import { CountryMySuffixService } from 'app/entities/country-my-suffix/country-my-suffix.service';
import { CountryMySuffix } from 'app/shared/model/country-my-suffix.model';

describe('Component Tests', () => {
    describe('CountryMySuffix Management Update Component', () => {
        let comp: CountryMySuffixUpdateComponent;
        let fixture: ComponentFixture<CountryMySuffixUpdateComponent>;
        let service: CountryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [CountryMySuffixUpdateComponent]
            })
                .overrideTemplate(CountryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CountryMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.country = entity;
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
                    const entity = new CountryMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.country = entity;
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
