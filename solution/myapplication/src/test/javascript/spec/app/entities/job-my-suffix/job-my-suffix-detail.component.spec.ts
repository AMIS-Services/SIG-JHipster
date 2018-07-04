/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { JobMySuffixDetailComponent } from 'app/entities/job-my-suffix/job-my-suffix-detail.component';
import { JobMySuffix } from 'app/shared/model/job-my-suffix.model';

describe('Component Tests', () => {
    describe('JobMySuffix Management Detail Component', () => {
        let comp: JobMySuffixDetailComponent;
        let fixture: ComponentFixture<JobMySuffixDetailComponent>;
        const route = ({ data: of({ job: new JobMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [JobMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.job).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
