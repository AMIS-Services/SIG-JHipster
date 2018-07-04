import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

type EntityResponseType = HttpResponse<IEmployeeMySuffix>;
type EntityArrayResponseType = HttpResponse<IEmployeeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/employees';

    constructor(private http: HttpClient) {}

    create(employee: IEmployeeMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employee);
        return this.http
            .post<IEmployeeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(employee: IEmployeeMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employee);
        return this.http
            .put<IEmployeeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEmployeeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmployeeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(employee: IEmployeeMySuffix): IEmployeeMySuffix {
        const copy: IEmployeeMySuffix = Object.assign({}, employee, {
            hireDate: employee.hireDate != null && employee.hireDate.isValid() ? employee.hireDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.hireDate = res.body.hireDate != null ? moment(res.body.hireDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((employee: IEmployeeMySuffix) => {
            employee.hireDate = employee.hireDate != null ? moment(employee.hireDate) : null;
        });
        return res;
    }
}
