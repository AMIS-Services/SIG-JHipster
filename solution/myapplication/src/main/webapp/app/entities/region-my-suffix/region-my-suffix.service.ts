import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';

type EntityResponseType = HttpResponse<IRegionMySuffix>;
type EntityArrayResponseType = HttpResponse<IRegionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RegionMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/regions';

    constructor(private http: HttpClient) {}

    create(region: IRegionMySuffix): Observable<EntityResponseType> {
        return this.http.post<IRegionMySuffix>(this.resourceUrl, region, { observe: 'response' });
    }

    update(region: IRegionMySuffix): Observable<EntityResponseType> {
        return this.http.put<IRegionMySuffix>(this.resourceUrl, region, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRegionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRegionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
