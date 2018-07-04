import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { Principal } from 'app/core';
import { CountryMySuffixService } from './country-my-suffix.service';

@Component({
    selector: 'jhi-country-my-suffix',
    templateUrl: './country-my-suffix.component.html'
})
export class CountryMySuffixComponent implements OnInit, OnDestroy {
    countries: ICountryMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private countryService: CountryMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.countryService.query().subscribe(
            (res: HttpResponse<ICountryMySuffix[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCountries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICountryMySuffix) {
        return item.id;
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe('countryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
