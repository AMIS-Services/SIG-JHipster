import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';

type EntityResponseType = HttpResponse<ILocationMySuffix>;
type EntityArrayResponseType = HttpResponse<ILocationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LocationMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/locations';

    constructor(private http: HttpClient) {}

    create(location: ILocationMySuffix): Observable<EntityResponseType> {
        return this.http.post<ILocationMySuffix>(this.resourceUrl, location, { observe: 'response' });
    }

    update(location: ILocationMySuffix): Observable<EntityResponseType> {
        return this.http.put<ILocationMySuffix>(this.resourceUrl, location, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ILocationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ILocationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
