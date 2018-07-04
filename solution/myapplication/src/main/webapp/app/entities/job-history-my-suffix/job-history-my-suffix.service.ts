import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';

type EntityResponseType = HttpResponse<IJobHistoryMySuffix>;
type EntityArrayResponseType = HttpResponse<IJobHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobHistoryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/job-histories';

    constructor(private http: HttpClient) {}

    create(jobHistory: IJobHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(jobHistory);
        return this.http
            .post<IJobHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(jobHistory: IJobHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(jobHistory);
        return this.http
            .put<IJobHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IJobHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IJobHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(jobHistory: IJobHistoryMySuffix): IJobHistoryMySuffix {
        const copy: IJobHistoryMySuffix = Object.assign({}, jobHistory, {
            startDate: jobHistory.startDate != null && jobHistory.startDate.isValid() ? jobHistory.startDate.toJSON() : null,
            endDate: jobHistory.endDate != null && jobHistory.endDate.isValid() ? jobHistory.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((jobHistory: IJobHistoryMySuffix) => {
            jobHistory.startDate = jobHistory.startDate != null ? moment(jobHistory.startDate) : null;
            jobHistory.endDate = jobHistory.endDate != null ? moment(jobHistory.endDate) : null;
        });
        return res;
    }
}
