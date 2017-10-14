import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ExpenseService {

    private resourceUrl = SERVER_API_URL + 'api/expenses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(expense: Expense): Observable<Expense> {
        const copy = this.convert(expense);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(expense: Expense): Observable<Expense> {
        const copy = this.convert(expense);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Expense> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.dateTime = this.dateUtils
            .convertDateTimeFromServer(entity.dateTime);
    }

    private convert(expense: Expense): Expense {
        const copy: Expense = Object.assign({}, expense);

        copy.dateTime = this.dateUtils.toDate(expense.dateTime);
        return copy;
    }
}
