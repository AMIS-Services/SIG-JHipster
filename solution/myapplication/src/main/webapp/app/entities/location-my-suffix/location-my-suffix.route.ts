import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { LocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';
import { LocationMySuffixComponent } from './location-my-suffix.component';
import { LocationMySuffixDetailComponent } from './location-my-suffix-detail.component';
import { LocationMySuffixUpdateComponent } from './location-my-suffix-update.component';
import { LocationMySuffixDeletePopupComponent } from './location-my-suffix-delete-dialog.component';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LocationMySuffixResolve implements Resolve<ILocationMySuffix> {
    constructor(private service: LocationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((location: HttpResponse<LocationMySuffix>) => location.body);
        }
        return Observable.of(new LocationMySuffix());
    }
}

export const locationRoute: Routes = [
    {
        path: 'location-my-suffix',
        component: LocationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-my-suffix/:id/view',
        component: LocationMySuffixDetailComponent,
        resolve: {
            location: LocationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-my-suffix/new',
        component: LocationMySuffixUpdateComponent,
        resolve: {
            location: LocationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'location-my-suffix/:id/edit',
        component: LocationMySuffixUpdateComponent,
        resolve: {
            location: LocationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.location.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const locationPopupRoute: Routes = [
    {
        path: 'location-my-suffix/:id/delete',
        component: LocationMySuffixDeletePopupComponent,
        resolve: {
            location: LocationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.location.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
