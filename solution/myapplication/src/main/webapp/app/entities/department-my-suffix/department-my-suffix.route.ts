import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { DepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { DepartmentMySuffixComponent } from './department-my-suffix.component';
import { DepartmentMySuffixDetailComponent } from './department-my-suffix-detail.component';
import { DepartmentMySuffixUpdateComponent } from './department-my-suffix-update.component';
import { DepartmentMySuffixDeletePopupComponent } from './department-my-suffix-delete-dialog.component';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DepartmentMySuffixResolve implements Resolve<IDepartmentMySuffix> {
    constructor(private service: DepartmentMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((department: HttpResponse<DepartmentMySuffix>) => department.body);
        }
        return Observable.of(new DepartmentMySuffix());
    }
}

export const departmentRoute: Routes = [
    {
        path: 'department-my-suffix',
        component: DepartmentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department-my-suffix/:id/view',
        component: DepartmentMySuffixDetailComponent,
        resolve: {
            department: DepartmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department-my-suffix/new',
        component: DepartmentMySuffixUpdateComponent,
        resolve: {
            department: DepartmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'department-my-suffix/:id/edit',
        component: DepartmentMySuffixUpdateComponent,
        resolve: {
            department: DepartmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentPopupRoute: Routes = [
    {
        path: 'department-my-suffix/:id/delete',
        component: DepartmentMySuffixDeletePopupComponent,
        resolve: {
            department: DepartmentMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
