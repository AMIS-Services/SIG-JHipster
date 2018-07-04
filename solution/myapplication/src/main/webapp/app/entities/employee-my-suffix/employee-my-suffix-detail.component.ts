import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

@Component({
    selector: 'jhi-employee-my-suffix-detail',
    templateUrl: './employee-my-suffix-detail.component.html'
})
export class EmployeeMySuffixDetailComponent implements OnInit {
    employee: IEmployeeMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employee }) => {
            this.employee = employee;
        });
    }

    previousState() {
        window.history.back();
    }
}
