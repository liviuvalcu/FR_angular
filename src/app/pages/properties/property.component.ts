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

export interface Discount{
      name: string;
      minimNights: string;
      minimalAmountSpent: number;
      discountLevels: string;
      discount: number;
}


@Component({
    providers: [MessageService],
    templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit{

    properties: Property[];
    discounts: Discount[];

    submitted: boolean = false;
    bookingDialogVisible: boolean = false;

    propertyToCreateBooking: Property;
    bookingToBeSaved?: Booking;
    isExpanded: boolean = false;
    editing: boolean = false;

    expandedRows = {};

    connectedUser: string;

    clonedDiscount: {[s: string]: Discount} = {};

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

    loadAllDiscounts(){
        this.propertyService.getAllDiscounts().subscribe({
            next: data => {
                this.discounts = data;
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
      this.loadAllDiscounts();
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

    onRowEdit(discount: Discount){
        this.clonedDiscount[discount.discountLevels as string] = {...discount};
    }
    onRowEditSave(discount: Discount){
        this.propertyService.updateDiscount(discount).subscribe({
            next: data => {
               delete this.clonedDiscount[discount.discountLevels as string];
            },
            error: err => {

            }
        });
    }
    onRowEditCancel(discount: Discount, index: number){
        this.discounts[index] = this.clonedDiscount[discount.discountLevels as string];
        delete this.clonedDiscount[discount.discountLevels as string];
    }
}
