import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';

@Component({
    selector: 'jhi-task-my-suffix-detail',
    templateUrl: './task-my-suffix-detail.component.html'
})
export class TaskMySuffixDetailComponent implements OnInit {
    task: ITaskMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
    }

    previousState() {
        window.history.back();
    }
}
