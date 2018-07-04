import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { JobMySuffixService } from 'app/entities/job-my-suffix';

@Component({
    selector: 'jhi-task-my-suffix-update',
    templateUrl: './task-my-suffix-update.component.html'
})
export class TaskMySuffixUpdateComponent implements OnInit {
    private _task: ITaskMySuffix;
    isSaving: boolean;

    jobs: IJobMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private taskService: TaskMySuffixService,
        private jobService: JobMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
        this.jobService.query().subscribe(
            (res: HttpResponse<IJobMySuffix[]>) => {
                this.jobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITaskMySuffix>>) {
        result.subscribe((res: HttpResponse<ITaskMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackJobById(index: number, item: IJobMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get task() {
        return this._task;
    }

    set task(task: ITaskMySuffix) {
        this._task = task;
    }
}
