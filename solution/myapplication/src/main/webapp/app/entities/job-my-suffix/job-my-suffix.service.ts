import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';

type EntityResponseType = HttpResponse<IJobMySuffix>;
type EntityArrayResponseType = HttpResponse<IJobMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/jobs';

    constructor(private http: HttpClient) {}

    create(job: IJobMySuffix): Observable<EntityResponseType> {
        return this.http.post<IJobMySuffix>(this.resourceUrl, job, { observe: 'response' });
    }

    update(job: IJobMySuffix): Observable<EntityResponseType> {
        return this.http.put<IJobMySuffix>(this.resourceUrl, job, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJobMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJobMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
