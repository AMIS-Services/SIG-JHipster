/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { RegionMySuffixDetailComponent } from 'app/entities/region-my-suffix/region-my-suffix-detail.component';
import { RegionMySuffix } from 'app/shared/model/region-my-suffix.model';

describe('Component Tests', () => {
    describe('RegionMySuffix Management Detail Component', () => {
        let comp: RegionMySuffixDetailComponent;
        let fixture: ComponentFixture<RegionMySuffixDetailComponent>;
        const route = ({ data: of({ region: new RegionMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [RegionMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RegionMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegionMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.region).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
