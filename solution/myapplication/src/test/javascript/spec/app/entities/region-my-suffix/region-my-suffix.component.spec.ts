/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyapplicationTestModule } from '../../../test.module';
import { RegionMySuffixComponent } from 'app/entities/region-my-suffix/region-my-suffix.component';
import { RegionMySuffixService } from 'app/entities/region-my-suffix/region-my-suffix.service';
import { RegionMySuffix } from 'app/shared/model/region-my-suffix.model';

describe('Component Tests', () => {
    describe('RegionMySuffix Management Component', () => {
        let comp: RegionMySuffixComponent;
        let fixture: ComponentFixture<RegionMySuffixComponent>;
        let service: RegionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [RegionMySuffixComponent],
                providers: []
            })
                .overrideTemplate(RegionMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegionMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RegionMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.regions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
