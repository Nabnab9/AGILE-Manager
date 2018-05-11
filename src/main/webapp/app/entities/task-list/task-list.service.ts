import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TaskList } from './task-list.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TaskList>;

@Injectable()
export class TaskListService {

    private resourceUrl =  SERVER_API_URL + 'api/task-lists';

    constructor(private http: HttpClient) { }

    create(taskList: TaskList): Observable<EntityResponseType> {
        const copy = this.convert(taskList);
        return this.http.post<TaskList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(taskList: TaskList): Observable<EntityResponseType> {
        const copy = this.convert(taskList);
        return this.http.put<TaskList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TaskList>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TaskList[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaskList[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TaskList[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TaskList = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TaskList[]>): HttpResponse<TaskList[]> {
        const jsonResponse: TaskList[] = res.body;
        const body: TaskList[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TaskList.
     */
    private convertItemFromServer(taskList: TaskList): TaskList {
        const copy: TaskList = Object.assign({}, taskList);
        return copy;
    }

    /**
     * Convert a TaskList to a JSON which can be sent to the server.
     */
    private convert(taskList: TaskList): TaskList {
        const copy: TaskList = Object.assign({}, taskList);
        return copy;
    }
}
