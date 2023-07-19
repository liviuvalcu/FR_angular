import { Component } from '@angular/core';
import {AppService} from "../service/AppService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "../service/storageservice";
import {User} from "./register/user";

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})

export class AppLoginComponent {

    form: any = {
        username: null,
        password: null
    };

    isLoggedIn = false;
    isLoginFailed = false;
    registerUser = false;
    errorMessage = '';
    roles: string[] = [];
    user: User = {};

    submitted: boolean = false;


    constructor(private app: AppService, private http: HttpClient, private router: Router, private storageService: StorageService) {
    }

    onSubmit(): void {
        const { username, password } = this.form;

        this.app.login(username, password).subscribe({
            next: data => {
                this.storageService.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.storageService.getUser().roles;
                this.reloadPage();
            },
            error: err => {

                this.isLoginFailed = true;
                this.router.navigate(['/access'])
            }
        });
    }

    reloadPage(): void {
       // window.location.reload();
        this.router.navigate(['/notfound'])
    }

    redirectToRegister(): void{
       // this.router.navigate(['/register'])
        this.registerUser = true;
    }

    hideDialog() {
        this.registerUser = false;
        this.submitted = false;
    }

    registerUserPost(){
        this.app.register(this.user).subscribe({
            next: data =>{
                this.storageService.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.storageService.getUser().roles;
                this.reloadPage();
            },
            error: err => {
                this.isLoginFailed = true;
                this.router.navigate(['/access'])
            }
        })
    }

}
