import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { Principal } from 'app/core';
import { RegionMySuffixService } from './region-my-suffix.service';

@Component({
    selector: 'jhi-region-my-suffix',
    templateUrl: './region-my-suffix.component.html'
})
export class RegionMySuffixComponent implements OnInit, OnDestroy {
    regions: IRegionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private regionService: RegionMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.regionService.query().subscribe(
            (res: HttpResponse<IRegionMySuffix[]>) => {
                this.regions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRegions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRegionMySuffix) {
        return item.id;
    }

    registerChangeInRegions() {
        this.eventSubscriber = this.eventManager.subscribe('regionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
