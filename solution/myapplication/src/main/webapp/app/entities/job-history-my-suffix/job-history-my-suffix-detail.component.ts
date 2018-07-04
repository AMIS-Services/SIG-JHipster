import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';

@Component({
    selector: 'jhi-job-history-my-suffix-detail',
    templateUrl: './job-history-my-suffix-detail.component.html'
})
export class JobHistoryMySuffixDetailComponent implements OnInit {
    jobHistory: IJobHistoryMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobHistory }) => {
            this.jobHistory = jobHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
