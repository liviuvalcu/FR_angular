import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_EMAIL = 'user-email';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() {}

    clean(): void {
        window.sessionStorage.clear();
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public saveUserEmail(email: any): void {
        window.sessionStorage.removeItem(USER_EMAIL);
        window.sessionStorage.setItem(USER_EMAIL, email);
    }

    public getEmail(): any {
        return window.sessionStorage.getItem(USER_EMAIL);
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return {};
    }

    public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return true;
        }

        return false;
    }
}
