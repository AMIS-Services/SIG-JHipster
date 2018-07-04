/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MyapplicationTestModule } from '../../../test.module';
import { JobHistoryMySuffixDetailComponent } from 'app/entities/job-history-my-suffix/job-history-my-suffix-detail.component';
import { JobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';

describe('Component Tests', () => {
    describe('JobHistoryMySuffix Management Detail Component', () => {
        let comp: JobHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<JobHistoryMySuffixDetailComponent>;
        const route = ({ data: of({ jobHistory: new JobHistoryMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MyapplicationTestModule],
                declarations: [JobHistoryMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JobHistoryMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JobHistoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jobHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
