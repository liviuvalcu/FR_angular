import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";

const PROPERTY_API = "http://localhost:8080/api/v1/property/";

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

}
