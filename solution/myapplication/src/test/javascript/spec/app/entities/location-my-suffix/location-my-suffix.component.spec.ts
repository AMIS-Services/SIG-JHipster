/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyapplicationTestModule } from '../../../test.module';
import { LocationMySuffixComponent } from 'app/entities/location-my-suffix/location-my-suffix.component';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/location-my-suffix.service';
import { LocationMySuffix } from 'app/shared/model/location-my-suffix.model';

describe('Component Tests', () => {
    describe('LocationMySuffix Management Component', () => {
        let comp: LocationMySuffixComponent;
        let fixture: ComponentFixture<LocationMySuffixComponent>;
        let service: LocationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [LocationMySuffixComponent],
                providers: []
            })
                .overrideTemplate(LocationMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LocationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LocationMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.locations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
