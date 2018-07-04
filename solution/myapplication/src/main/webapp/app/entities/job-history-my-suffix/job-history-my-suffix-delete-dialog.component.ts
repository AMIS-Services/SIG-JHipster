import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';

@Component({
    selector: 'jhi-job-history-my-suffix-delete-dialog',
    templateUrl: './job-history-my-suffix-delete-dialog.component.html'
})
export class JobHistoryMySuffixDeleteDialogComponent {
    jobHistory: IJobHistoryMySuffix;

    constructor(
        private jobHistoryService: JobHistoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobHistoryListModification',
                content: 'Deleted an jobHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-history-my-suffix-delete-popup',
    template: ''
})
export class JobHistoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jobHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JobHistoryMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.jobHistory = jobHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
