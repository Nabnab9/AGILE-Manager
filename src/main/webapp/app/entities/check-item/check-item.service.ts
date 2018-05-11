import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CheckItem } from './check-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CheckItem>;

@Injectable()
export class CheckItemService {

    private resourceUrl =  SERVER_API_URL + 'api/check-items';

    constructor(private http: HttpClient) { }

    create(checkItem: CheckItem): Observable<EntityResponseType> {
        const copy = this.convert(checkItem);
        return this.http.post<CheckItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(checkItem: CheckItem): Observable<EntityResponseType> {
        const copy = this.convert(checkItem);
        return this.http.put<CheckItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CheckItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CheckItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<CheckItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CheckItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CheckItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CheckItem[]>): HttpResponse<CheckItem[]> {
        const jsonResponse: CheckItem[] = res.body;
        const body: CheckItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CheckItem.
     */
    private convertItemFromServer(checkItem: CheckItem): CheckItem {
        const copy: CheckItem = Object.assign({}, checkItem);
        return copy;
    }

    /**
     * Convert a CheckItem to a JSON which can be sent to the server.
     */
    private convert(checkItem: CheckItem): CheckItem {
        const copy: CheckItem = Object.assign({}, checkItem);
        return copy;
    }
}
