import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TagList } from './tag-list.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TagList>;

@Injectable()
export class TagListService {

    private resourceUrl =  SERVER_API_URL + 'api/tag-lists';

    constructor(private http: HttpClient) { }

    create(tagList: TagList): Observable<EntityResponseType> {
        const copy = this.convert(tagList);
        return this.http.post<TagList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tagList: TagList): Observable<EntityResponseType> {
        const copy = this.convert(tagList);
        return this.http.put<TagList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TagList>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TagList[]>> {
        const options = createRequestOption(req);
        return this.http.get<TagList[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TagList[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TagList = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TagList[]>): HttpResponse<TagList[]> {
        const jsonResponse: TagList[] = res.body;
        const body: TagList[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TagList.
     */
    private convertItemFromServer(tagList: TagList): TagList {
        const copy: TagList = Object.assign({}, tagList);
        return copy;
    }

    /**
     * Convert a TagList to a JSON which can be sent to the server.
     */
    private convert(tagList: TagList): TagList {
        const copy: TagList = Object.assign({}, tagList);
        return copy;
    }
}
