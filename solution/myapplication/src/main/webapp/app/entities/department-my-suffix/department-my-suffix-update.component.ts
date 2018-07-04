import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix';

@Component({
    selector: 'jhi-department-my-suffix-update',
    templateUrl: './department-my-suffix-update.component.html'
})
export class DepartmentMySuffixUpdateComponent implements OnInit {
    private _department: IDepartmentMySuffix;
    isSaving: boolean;

    locations: ILocationMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private departmentService: DepartmentMySuffixService,
        private locationService: LocationMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ department }) => {
            this.department = department;
        });
        this.locationService.query({ filter: 'department-is-null' }).subscribe(
            (res: HttpResponse<ILocationMySuffix[]>) => {
                if (!this.department.locationId) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.department.locationId).subscribe(
                        (subRes: HttpResponse<ILocationMySuffix>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(this.departmentService.update(this.department));
        } else {
            this.subscribeToSaveResponse(this.departmentService.create(this.department));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentMySuffix>>) {
        result.subscribe((res: HttpResponse<IDepartmentMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocationById(index: number, item: ILocationMySuffix) {
        return item.id;
    }
    get department() {
        return this._department;
    }

    set department(department: IDepartmentMySuffix) {
        this._department = department;
    }
}
