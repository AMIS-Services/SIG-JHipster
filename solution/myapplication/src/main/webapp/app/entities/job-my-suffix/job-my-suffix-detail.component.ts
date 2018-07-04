import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';

@Component({
    selector: 'jhi-job-my-suffix-detail',
    templateUrl: './job-my-suffix-detail.component.html'
})
export class JobMySuffixDetailComponent implements OnInit {
    job: IJobMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ job }) => {
            this.job = job;
        });
    }

    previousState() {
        window.history.back();
    }
}
