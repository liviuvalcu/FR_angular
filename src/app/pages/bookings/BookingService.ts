import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../properties/user";
import {Booking} from "../properties/property.component";

const BOOKING_API = "http://localhost:8080/api/v1/booking/";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class BookingService {

    constructor(private http: HttpClient) {
    }


    createBooking(booking: Booking): Observable<any>{
        return this.http.post(
            BOOKING_API + 'create',
            {
                booking
            }  ,

            httpOptions
        );
    }

    getBookingByPropertyName(propertyName: string): Observable<any>{
          return this.http.get(BOOKING_API + 'byPropertyName',{params: {'propertyName': propertyName}});
    }

}
