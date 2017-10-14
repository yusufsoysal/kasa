import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Budget } from './budget.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BudgetService {

    private resourceUrl = SERVER_API_URL + 'api/budgets';

    constructor(private http: Http) { }

    create(budget: Budget): Observable<Budget> {
        const copy = this.convert(budget);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(budget: Budget): Observable<Budget> {
        const copy = this.convert(budget);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Budget> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(budget: Budget): Budget {
        const copy: Budget = Object.assign({}, budget);
        return copy;
    }
}
