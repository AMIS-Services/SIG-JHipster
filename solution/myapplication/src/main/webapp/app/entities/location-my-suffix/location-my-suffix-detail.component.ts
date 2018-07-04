import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';

@Component({
    selector: 'jhi-location-my-suffix-detail',
    templateUrl: './location-my-suffix-detail.component.html'
})
export class LocationMySuffixDetailComponent implements OnInit {
    location: ILocationMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
    }

    previousState() {
        window.history.back();
    }
}
