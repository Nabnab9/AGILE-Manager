import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CheckList } from './check-list.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CheckList>;

@Injectable()
export class CheckListService {

    private resourceUrl =  SERVER_API_URL + 'api/check-lists';

    constructor(private http: HttpClient) { }

    create(checkList: CheckList): Observable<EntityResponseType> {
        const copy = this.convert(checkList);
        return this.http.post<CheckList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(checkList: CheckList): Observable<EntityResponseType> {
        const copy = this.convert(checkList);
        return this.http.put<CheckList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CheckList>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CheckList[]>> {
        const options = createRequestOption(req);
        return this.http.get<CheckList[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CheckList[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CheckList = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CheckList[]>): HttpResponse<CheckList[]> {
        const jsonResponse: CheckList[] = res.body;
        const body: CheckList[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CheckList.
     */
    private convertItemFromServer(checkList: CheckList): CheckList {
        const copy: CheckList = Object.assign({}, checkList);
        return copy;
    }

    /**
     * Convert a CheckList to a JSON which can be sent to the server.
     */
    private convert(checkList: CheckList): CheckList {
        const copy: CheckList = Object.assign({}, checkList);
        return copy;
    }
}
