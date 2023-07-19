import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {Property} from "./property";
import {PropertyService} from "./PropertyService";

@Component({
    templateUrl: './property.component.html'
})
export class PropertyComponent implements OnInit{

    properties: Property[];

    submitted: boolean = false;
    constructor(private propertyService: PropertyService) {}

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

    ngOnInit() {
      this.loadAllProperties();
    }
}
