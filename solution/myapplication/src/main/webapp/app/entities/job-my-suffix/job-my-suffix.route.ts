import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { JobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { JobMySuffixService } from './job-my-suffix.service';
import { JobMySuffixComponent } from './job-my-suffix.component';
import { JobMySuffixDetailComponent } from './job-my-suffix-detail.component';
import { JobMySuffixUpdateComponent } from './job-my-suffix-update.component';
import { JobMySuffixDeletePopupComponent } from './job-my-suffix-delete-dialog.component';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class JobMySuffixResolve implements Resolve<IJobMySuffix> {
    constructor(private service: JobMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((job: HttpResponse<JobMySuffix>) => job.body);
        }
        return Observable.of(new JobMySuffix());
    }
}

export const jobRoute: Routes = [
    {
        path: 'job-my-suffix',
        component: JobMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'myapplicationApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-my-suffix/:id/view',
        component: JobMySuffixDetailComponent,
        resolve: {
            job: JobMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-my-suffix/new',
        component: JobMySuffixUpdateComponent,
        resolve: {
            job: JobMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-my-suffix/:id/edit',
        component: JobMySuffixUpdateComponent,
        resolve: {
            job: JobMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobPopupRoute: Routes = [
    {
        path: 'job-my-suffix/:id/delete',
        component: JobMySuffixDeletePopupComponent,
        resolve: {
            job: JobMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
