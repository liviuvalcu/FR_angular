import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {Discount} from "./property.component";

const PROPERTY_API = "http://localhost:8080/api/v1/property/";
const DISCOUNT_API = "http://localhost:8080/api/v1/parameters/";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class PropertyService {

    constructor(private http: HttpClient) {
    }

    // @ts-ignore
    getAllProperties(): Observable<any>{
      return this.http.get(PROPERTY_API + 'all',{params: {}});
    }

    getAllDiscounts(): Observable<any>{
        return this.http.get(DISCOUNT_API + 'all',{params: {}});
    }

    updateDiscount(discount: Discount){
        let name = discount.name;
        let minimNights = discount.minimNights;
        let minimalAmountSpent = discount.minimalAmountSpent;
        let discountLevels = discount.discountLevels;
        const params = new HttpParams()
            .set('name', name)
            .set('minimNights', minimNights)
            .set('minimalAmountSpent', minimalAmountSpent)
            .set('discountLevels', discountLevels)

        return this.http.post(DISCOUNT_API + 'update',
             {},
            { params: params})
    }
}
