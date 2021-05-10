import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl = environment.apiUrl + environment.basePath;
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('chekkitCurrentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();

    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }
    

    register(user: User) {

        return this.http.post<any>(this.baseUrl + `/authentication/signup`, user)
            .pipe(map(u => {
                console.log(u.data)

                // login successful if there's a jwt token in the response
                if (u.data.user && u.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(user)
                    u.data.user.token = u.data.token;
                    localStorage.setItem('quickstoreCurrentUser', JSON.stringify(u.data.user));

                    this.currentUserSubject.next(u.data.user);
                }
                return u.data.user;
            }));

    }

    login(email: string, password: string) {
        console.log(444)
        return this.http.post<any>(this.baseUrl + `/authentication/signin`, { email, password })
            .pipe(map(u => {
                console.log(u.data)

                // login successful if there's a jwt token in the response
                if (u.data.user && u.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(u)
                    u.data.user.token = u.data.token;
                    localStorage.setItem('quickstoreCurrentUser', JSON.stringify(u.data.user));
                    // localStorage.setItem('quickstoreCurrentUser', JSON.stringify(user.data.user));

                    this.currentUserSubject.next(u.data.user);
                }
                return u.data.user;
            }));
    }

    /**
      * @param none
      * @returns boolean TRUE OR FALSE
      */
    tokenExist() {
        return !!JSON.parse(localStorage.getItem('quickstoreCurrentUser')!);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.currentUserSubject.next(null);
    }
}
