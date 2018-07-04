import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';

@Component({
    selector: 'jhi-region-my-suffix-detail',
    templateUrl: './region-my-suffix-detail.component.html'
})
export class RegionMySuffixDetailComponent implements OnInit {
    region: IRegionMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ region }) => {
            this.region = region;
        });
    }

    previousState() {
        window.history.back();
    }
}
