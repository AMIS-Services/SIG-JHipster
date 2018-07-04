import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { CountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from './country-my-suffix.service';
import { CountryMySuffixComponent } from './country-my-suffix.component';
import { CountryMySuffixDetailComponent } from './country-my-suffix-detail.component';
import { CountryMySuffixUpdateComponent } from './country-my-suffix-update.component';
import { CountryMySuffixDeletePopupComponent } from './country-my-suffix-delete-dialog.component';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CountryMySuffixResolve implements Resolve<ICountryMySuffix> {
    constructor(private service: CountryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((country: HttpResponse<CountryMySuffix>) => country.body);
        }
        return Observable.of(new CountryMySuffix());
    }
}

export const countryRoute: Routes = [
    {
        path: 'country-my-suffix',
        component: CountryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-my-suffix/:id/view',
        component: CountryMySuffixDetailComponent,
        resolve: {
            country: CountryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-my-suffix/new',
        component: CountryMySuffixUpdateComponent,
        resolve: {
            country: CountryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-my-suffix/:id/edit',
        component: CountryMySuffixUpdateComponent,
        resolve: {
            country: CountryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country-my-suffix/:id/delete',
        component: CountryMySuffixDeletePopupComponent,
        resolve: {
            country: CountryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myapplicationApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
