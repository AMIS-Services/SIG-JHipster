import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';

@Component({
    selector: 'jhi-department-my-suffix-detail',
    templateUrl: './department-my-suffix-detail.component.html'
})
export class DepartmentMySuffixDetailComponent implements OnInit {
    department: IDepartmentMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ department }) => {
            this.department = department;
        });
    }

    previousState() {
        window.history.back();
    }
}
