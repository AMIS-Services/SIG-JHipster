import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';

@Component({
    selector: 'jhi-country-my-suffix-detail',
    templateUrl: './country-my-suffix-detail.component.html'
})
export class CountryMySuffixDetailComponent implements OnInit {
    country: ICountryMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ country }) => {
            this.country = country;
        });
    }

    previousState() {
        window.history.back();
    }
}
