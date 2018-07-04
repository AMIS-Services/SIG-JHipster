import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from './country-my-suffix.service';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from 'app/entities/region-my-suffix';

@Component({
    selector: 'jhi-country-my-suffix-update',
    templateUrl: './country-my-suffix-update.component.html'
})
export class CountryMySuffixUpdateComponent implements OnInit {
    private _country: ICountryMySuffix;
    isSaving: boolean;

    regions: IRegionMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private countryService: CountryMySuffixService,
        private regionService: RegionMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ country }) => {
            this.country = country;
        });
        this.regionService.query({ filter: 'country-is-null' }).subscribe(
            (res: HttpResponse<IRegionMySuffix[]>) => {
                if (!this.country.regionId) {
                    this.regions = res.body;
                } else {
                    this.regionService.find(this.country.regionId).subscribe(
                        (subRes: HttpResponse<IRegionMySuffix>) => {
                            this.regions = [subRes.body].concat(res.body);
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
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(this.countryService.create(this.country));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICountryMySuffix>>) {
        result.subscribe((res: HttpResponse<ICountryMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRegionById(index: number, item: IRegionMySuffix) {
        return item.id;
    }
    get country() {
        return this._country;
    }

    set country(country: ICountryMySuffix) {
        this._country = country;
    }
}
