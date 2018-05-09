import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Sprint } from './sprint.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Sprint>;

@Injectable()
export class SprintService {

    private resourceUrl =  SERVER_API_URL + 'api/sprints';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(sprint: Sprint): Observable<EntityResponseType> {
        const copy = this.convert(sprint);
        return this.http.post<Sprint>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sprint: Sprint): Observable<EntityResponseType> {
        const copy = this.convert(sprint);
        return this.http.put<Sprint>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Sprint>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Sprint[]>> {
        const options = createRequestOption(req);
        return this.http.get<Sprint[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Sprint[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Sprint = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Sprint[]>): HttpResponse<Sprint[]> {
        const jsonResponse: Sprint[] = res.body;
        const body: Sprint[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Sprint.
     */
    private convertItemFromServer(sprint: Sprint): Sprint {
        const copy: Sprint = Object.assign({}, sprint);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(sprint.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateFromServer(sprint.endDate);
        return copy;
    }

    /**
     * Convert a Sprint to a JSON which can be sent to the server.
     */
    private convert(sprint: Sprint): Sprint {
        const copy: Sprint = Object.assign({}, sprint);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(sprint.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(sprint.endDate);
        return copy;
    }
}
