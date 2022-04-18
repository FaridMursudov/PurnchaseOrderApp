import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreatePurnchaseOrderInput } from "../models/createPurnchaseOrderInput";
import { PurnchaseOrder } from "../models/purnchaseOrder";
import { PurnchaseOrderItem } from "../models/purnchaseOrderItem";
import { User } from "../models/user";

const httpOptions = {
    headers: new HttpHeaders({
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    })
}

@Injectable({
    providedIn: 'root'
})
export class PurnchaseOrderItemsService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getPurnchaseOrderItems() : Observable<PurnchaseOrderItem[]> {
        return this.http.get<PurnchaseOrderItem[]>(`${this.baseUrl}PurnchaseOrder`, httpOptions);
    }

    createPurnchaseOrderItem(createModel: { name: string, price: number }) {
        return this.http.post(`${this.baseUrl}PurnchaseOrder`, createModel, httpOptions);
    }

    getPurnchaseOrders() : Observable<PurnchaseOrder[]> {
        return this.http.get<PurnchaseOrder[]>(`${this.baseUrl}PurnchaseOrder`, httpOptions);
    }

    submitPurnchaseOrders(id: number) {
        return this.http.post(`${this.baseUrl}PurnchaseOrder/`,
        { id: id },
        httpOptions);
    }

    createPurnchaseOrder(createModel: CreatePurnchaseOrderInput) {
        return this.http.post(`${this.baseUrl}PurnchaseOrder/CreatePurnchaseOrder`, createModel, httpOptions);
    }
}
