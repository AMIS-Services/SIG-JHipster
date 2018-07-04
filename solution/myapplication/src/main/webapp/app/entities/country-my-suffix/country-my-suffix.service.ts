import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';

type EntityResponseType = HttpResponse<ICountryMySuffix>;
type EntityArrayResponseType = HttpResponse<ICountryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CountryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/countries';

    constructor(private http: HttpClient) {}

    create(country: ICountryMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICountryMySuffix>(this.resourceUrl, country, { observe: 'response' });
    }

    update(country: ICountryMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICountryMySuffix>(this.resourceUrl, country, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICountryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICountryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
