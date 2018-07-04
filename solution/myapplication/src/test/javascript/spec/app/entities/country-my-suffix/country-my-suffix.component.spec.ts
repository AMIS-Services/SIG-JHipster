/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyapplicationTestModule } from '../../../test.module';
import { CountryMySuffixComponent } from 'app/entities/country-my-suffix/country-my-suffix.component';
import { CountryMySuffixService } from 'app/entities/country-my-suffix/country-my-suffix.service';
import { CountryMySuffix } from 'app/shared/model/country-my-suffix.model';

describe('Component Tests', () => {
    describe('CountryMySuffix Management Component', () => {
        let comp: CountryMySuffixComponent;
        let fixture: ComponentFixture<CountryMySuffixComponent>;
        let service: CountryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [CountryMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CountryMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CountryMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.countries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
