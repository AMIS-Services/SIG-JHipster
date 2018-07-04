import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { JobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';
import { JobHistoryMySuffixComponent } from './job-history-my-suffix.component';
import { JobHistoryMySuffixDetailComponent } from './job-history-my-suffix-detail.component';
import { JobHistoryMySuffixUpdateComponent } from './job-history-my-suffix-update.component';
import { JobHistoryMySuffixDeletePopupComponent } from './job-history-my-suffix-delete-dialog.component';
import { IJobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class JobHistoryMySuffixResolve implements Resolve<IJobHistoryMySuffix> {
    constructor(private service: JobHistoryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((jobHistory: HttpResponse<JobHistoryMySuffix>) => jobHistory.body);
        }
        return Observable.of(new JobHistoryMySuffix());
    }
}

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history-my-suffix',
        component: JobHistoryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-my-suffix/:id/view',
        component: JobHistoryMySuffixDetailComponent,
        resolve: {
            jobHistory: JobHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-my-suffix/new',
        component: JobHistoryMySuffixUpdateComponent,
        resolve: {
            jobHistory: JobHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history-my-suffix/:id/edit',
        component: JobHistoryMySuffixUpdateComponent,
        resolve: {
            jobHistory: JobHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history-my-suffix/:id/delete',
        component: JobHistoryMySuffixDeletePopupComponent,
        resolve: {
            jobHistory: JobHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
