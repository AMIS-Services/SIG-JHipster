import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { TaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { TaskMySuffixService } from './task-my-suffix.service';
import { TaskMySuffixComponent } from './task-my-suffix.component';
import { TaskMySuffixDetailComponent } from './task-my-suffix-detail.component';
import { TaskMySuffixUpdateComponent } from './task-my-suffix-update.component';
import { TaskMySuffixDeletePopupComponent } from './task-my-suffix-delete-dialog.component';
import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TaskMySuffixResolve implements Resolve<ITaskMySuffix> {
    constructor(private service: TaskMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((task: HttpResponse<TaskMySuffix>) => task.body);
        }
        return Observable.of(new TaskMySuffix());
    }
}

export const taskRoute: Routes = [
    {
        path: 'task-my-suffix',
        component: TaskMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-my-suffix/:id/view',
        component: TaskMySuffixDetailComponent,
        resolve: {
            task: TaskMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-my-suffix/new',
        component: TaskMySuffixUpdateComponent,
        resolve: {
            task: TaskMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-my-suffix/:id/edit',
        component: TaskMySuffixUpdateComponent,
        resolve: {
            task: TaskMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskPopupRoute: Routes = [
    {
        path: 'task-my-suffix/:id/delete',
        component: TaskMySuffixDeletePopupComponent,
        resolve: {
            task: TaskMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
