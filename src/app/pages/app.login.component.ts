import {Component, OnInit} from '@angular/core';
import {AppService} from "../service/AppService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "../service/storageservice";
import {User} from "./properties/user";
import RegistrationDao, {PropertyBean, SignUpRequest, UserBean} from "./RegistrationDao";

interface Gender {
    name: string;
    code: string;
}

interface Count {
    name: number;
    code: number;
}

interface UserTypeD {
    name: string;
    code: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})

export class AppLoginComponent implements OnInit{

    form: any = {
        username: null,
        password: null
    };

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    user: User = {};

    submitted: boolean = false;

    registerUser = false;
    inputDataUser = false;
    propertyListing = false;


    gender: Gender[] | undefined;

    userTypeD: UserTypeD[] | undefined;

    selectedGender: Gender | undefined;

    registration: RegistrationDao;
    signUpRequest: SignUpRequest;
    userBean: UserBean;
    propertyBean: PropertyBean;

    bedroomCount: Count[];
    bathroomCount: Count[];

    selectedUserType: UserTypeD;

    selectedBedroom: Count;
    selectedBathRoom: Count;
    selectedGuests: Count;





    constructor(private app: AppService, private http: HttpClient, private router: Router, private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.gender = [
            {name: "Male", code:"M"},
            {name:  "Female", code: "F"}
        ];

        this.bedroomCount = [
            {name: 1, code: 1},
            {name: 2, code: 2},
            {name: 3, code: 3},
            {name: 4, code: 4},
            {name: 5, code: 5},
            {name: 6, code: 6},
            {name: 7, code: 7}
        ];

        this.bathroomCount = [
            {name: 1, code: 1},
            {name: 2, code: 2},
            {name: 3, code: 3},
            {name: 4, code: 4}

        ];

        this.userTypeD = [
            {name: 'HOST', code: 'HOST' },
            {name: 'GUEST', code: 'GUEST' }
        ]
        this.signUpRequest ={}
        this.userBean ={}
        this.propertyBean ={}



        this.registration = {
            signUpRequest : this.signUpRequest,
            userBean : this.userBean,
            propertyBean : this.propertyBean,
        }
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
                this.storageService.clean();
                this.isLoginFailed = true;
                this.router.navigate(['/access'])
            }
        });
    }

    reloadPage(): void {
       // window.location.reload();
        this.router.navigate(['/properties'])
    }

    redirectToRegister(): void{
       // this.router.navigate(['/register'])
        this.registerUser = true;
    }

    hideDialog() {
        this.registerUser = false;
        this.inputDataUser = false;
        this.propertyListing = false;
        this.submitted = false;
        this.registration = {};
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

    registerUserWithProperty(){
        this.registration.userType = this.selectedUserType.code;
        this.registration.userBean.gender = this.selectedGender.code;

        this.registration.propertyBean.bathroomCnt = this.selectedBathRoom.code;
        this.registration.propertyBean.bedroomCnt = this.selectedBedroom.code;
        this.registration.propertyBean.guestNum = this.selectedGuests.code;
        this.app.registerUser(this.registration).subscribe({
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

    goToUserDetails(){
        this.registerUser = false;
        this.inputDataUser = true;
    }

    goBackToRegistration(){
        this.registerUser = true;
        this.inputDataUser = false;
    }

    goToProperty(){
        this.inputDataUser = false;
        this.propertyListing = true;
    }

    goBackToUserDetails(){
        this.inputDataUser = true;
        this.propertyListing = false;
    }

}
