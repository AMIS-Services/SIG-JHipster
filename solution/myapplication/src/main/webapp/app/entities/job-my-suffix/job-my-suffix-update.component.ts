import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { JobMySuffixService } from './job-my-suffix.service';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix';
import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from 'app/entities/task-my-suffix';

@Component({
    selector: 'jhi-job-my-suffix-update',
    templateUrl: './job-my-suffix-update.component.html'
})
export class JobMySuffixUpdateComponent implements OnInit {
    private _job: IJobMySuffix;
    isSaving: boolean;

    employees: IEmployeeMySuffix[];

    tasks: ITaskMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private jobService: JobMySuffixService,
        private employeeService: EmployeeMySuffixService,
        private taskService: TaskMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ job }) => {
            this.job = job;
        });
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployeeMySuffix[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskService.query().subscribe(
            (res: HttpResponse<ITaskMySuffix[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.job.id !== undefined) {
            this.subscribeToSaveResponse(this.jobService.update(this.job));
        } else {
            this.subscribeToSaveResponse(this.jobService.create(this.job));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IJobMySuffix>>) {
        result.subscribe((res: HttpResponse<IJobMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEmployeeById(index: number, item: IEmployeeMySuffix) {
        return item.id;
    }

    trackTaskById(index: number, item: ITaskMySuffix) {
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
    get job() {
        return this._job;
    }

    set job(job: IJobMySuffix) {
        this._job = job;
    }
}
