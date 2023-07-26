import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {Property} from "./property";
import {PropertyService} from "./PropertyService";
import {BookingService} from "../bookings/BookingService";
import {MessageService} from "primeng/api";
import {StorageService} from "../../service/storageservice";

export interface Booking{
      checkInDate?: Date;
      checkOutDate?: Date;
      seniorGuestNum?: number;
      adultGuestNum?: number;
      childGuestNum?: number;
      guestEmail?: string;
      propertyName?: string;
}


@Component({
    providers: [MessageService],
    templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit{

    properties: Property[];

    submitted: boolean = false;
    bookingDialogVisible: boolean = false;

    propertyToCreateBooking: Property;
    bookingToBeSaved?: Booking;
    isExpanded: boolean = false;

    expandedRows = {};

    connectedUser: string;

    constructor(private propertyService: PropertyService, private bookingService: BookingService, private storageService: StorageService) {}

    registerUser() {
        this.submitted = true;
    }

    loadAllProperties(){
        this.propertyService.getAllProperties().subscribe({
            next: data => {
                this.properties = data;
            },
            error: err => {

            }
        });
    }

    openCreateBooking(property: Property){
        this.bookingDialogVisible = true;
        this.propertyToCreateBooking = property;

    }


    createBooking(){
        this.bookingToBeSaved.propertyName = this.propertyToCreateBooking.propertyName;
        this.bookingToBeSaved.guestEmail = this.connectedUser;
        this.bookingService.createBooking(this.bookingToBeSaved).subscribe({
            next: data => {
                this.bookingToBeSaved = {};
                this.bookingDialogVisible = false;
                },
            error: err => {
                this.bookingToBeSaved = {};
                this.bookingDialogVisible = false;
            }
        });
    }

    hideDialog(){
        this.bookingDialogVisible = false;
    }

    expandAll(){
        if(!this.isExpanded){
            this.properties?.forEach(property => this.expandedRows[property.propertyName] = true);

        } else {
            this.expandedRows={};
        }
        this.isExpanded = !this.isExpanded;
    }

    loadBookings(property: Property){
        this.bookingService.getBookingByPropertyName(property.propertyName).subscribe({
            next: data => {
                property.bookings = data;
            },
            error: err => {

            }
        });
    }

    ngOnInit() {
      this.loadAllProperties();
      this.bookingToBeSaved = {
          seniorGuestNum: 0,
          childGuestNum: 0,
          checkInDate: null,
          checkOutDate: null,
          adultGuestNum: 0,
          guestEmail: ''
      }
      this.connectedUser = this.storageService.getEmail();
    }
}
