import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { RegionMySuffixService } from './region-my-suffix.service';

@Component({
    selector: 'jhi-region-my-suffix-update',
    templateUrl: './region-my-suffix-update.component.html'
})
export class RegionMySuffixUpdateComponent implements OnInit {
    private _region: IRegionMySuffix;
    isSaving: boolean;

    constructor(private regionService: RegionMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ region }) => {
            this.region = region;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(this.regionService.create(this.region));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRegionMySuffix>>) {
        result.subscribe((res: HttpResponse<IRegionMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get region() {
        return this._region;
    }

    set region(region: IRegionMySuffix) {
        this._region = region;
    }
}
