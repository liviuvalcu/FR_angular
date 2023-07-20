import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../pages/properties/user";
import RegistrationDao from "../pages/RegistrationDao";

const AUTH_API = "http://localhost:8080/api/v1/auth/";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class AppService {

    authenticated = false;

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'signin',
            {
                email,
                password,
            },
            httpOptions
        );
    }

    register(user: User): Observable<any>{
        return this.http.post(
            AUTH_API + 'signup',
            user,
            httpOptions
        );
    }

    registerUser(user: RegistrationDao): Observable<any>{
        return this.http.post(
            AUTH_API + 'registerUser',
            user,
            httpOptions
        );
    }

}
