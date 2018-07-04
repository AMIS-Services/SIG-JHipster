import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from './employee-my-suffix.service';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix';

@Component({
    selector: 'jhi-employee-my-suffix-update',
    templateUrl: './employee-my-suffix-update.component.html'
})
export class EmployeeMySuffixUpdateComponent implements OnInit {
    private _employee: IEmployeeMySuffix;
    isSaving: boolean;

    departments: IDepartmentMySuffix[];

    employees: IEmployeeMySuffix[];
    hireDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private employeeService: EmployeeMySuffixService,
        private departmentService: DepartmentMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employee }) => {
            this.employee = employee;
        });
        this.departmentService.query().subscribe(
            (res: HttpResponse<IDepartmentMySuffix[]>) => {
                this.departments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployeeMySuffix[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.employee.hireDate = moment(this.hireDate, DATE_TIME_FORMAT);
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(this.employeeService.create(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeMySuffix>>) {
        result.subscribe((res: HttpResponse<IEmployeeMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartmentById(index: number, item: IDepartmentMySuffix) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployeeMySuffix) {
        return item.id;
    }
    get employee() {
        return this._employee;
    }

    set employee(employee: IEmployeeMySuffix) {
        this._employee = employee;
        this.hireDate = moment(employee.hireDate).format(DATE_TIME_FORMAT);
    }
}
