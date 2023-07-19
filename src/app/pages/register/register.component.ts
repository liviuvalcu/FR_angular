import {Component, OnInit} from '@angular/core';
import {User} from "./user";

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

    user: User = {};

    submitted: boolean = false;
    constructor() {}

    registerUser() {
        this.submitted = true;
    }

    ngOnInit() {
    }
}
