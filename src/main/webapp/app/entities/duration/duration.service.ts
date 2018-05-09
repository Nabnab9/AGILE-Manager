import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Duration } from './duration.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Duration>;

@Injectable()
export class DurationService {

    private resourceUrl =  SERVER_API_URL + 'api/durations';

    constructor(private http: HttpClient) { }

    create(duration: Duration): Observable<EntityResponseType> {
        const copy = this.convert(duration);
        return this.http.post<Duration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(duration: Duration): Observable<EntityResponseType> {
        const copy = this.convert(duration);
        return this.http.put<Duration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Duration>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Duration[]>> {
        const options = createRequestOption(req);
        return this.http.get<Duration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Duration[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Duration = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Duration[]>): HttpResponse<Duration[]> {
        const jsonResponse: Duration[] = res.body;
        const body: Duration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Duration.
     */
    private convertItemFromServer(duration: Duration): Duration {
        const copy: Duration = Object.assign({}, duration);
        return copy;
    }

    /**
     * Convert a Duration to a JSON which can be sent to the server.
     */
    private convert(duration: Duration): Duration {
        const copy: Duration = Object.assign({}, duration);
        return copy;
    }
}
