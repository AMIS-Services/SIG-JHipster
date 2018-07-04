import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix';

@Component({
    selector: 'jhi-location-my-suffix-update',
    templateUrl: './location-my-suffix-update.component.html'
})
export class LocationMySuffixUpdateComponent implements OnInit {
    private _location: ILocationMySuffix;
    isSaving: boolean;

    countries: ICountryMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private locationService: LocationMySuffixService,
        private countryService: CountryMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
        this.countryService.query({ filter: 'location-is-null' }).subscribe(
            (res: HttpResponse<ICountryMySuffix[]>) => {
                if (!this.location.countryId) {
                    this.countries = res.body;
                } else {
                    this.countryService.find(this.location.countryId).subscribe(
                        (subRes: HttpResponse<ICountryMySuffix>) => {
                            this.countries = [subRes.body].concat(res.body);
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
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILocationMySuffix>>) {
        result.subscribe((res: HttpResponse<ILocationMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCountryById(index: number, item: ICountryMySuffix) {
        return item.id;
    }
    get location() {
        return this._location;
    }

    set location(location: ILocationMySuffix) {
        this._location = location;
    }
}
