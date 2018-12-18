import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../_models';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: Http) {
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value as User;
    }

    login(email: string, password: string): Observable<User> {
        // tslint:disable-next-line:max-line-length
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'});
        const options = new RequestOptions({ headers: headers });
        // tslint:disable-next-line:max-line-length
        const temp = this.http.post('https://emil376g.aspitcloud.dk/api/public/api/login', JSON.stringify({email: email, password: password}), options)
        // tslint:disable-next-line:max-line-length
        .pipe(map((res: Response) => res.json()), tap((_user: User) => {this.currentUserSubject.next(_user); }));
    return temp;
    }

    logout() {
        // remove user from local storage to log user out
        this.currentUserSubject.next(null);
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          console.error(error);

          this.log(`${operation} failed: ${error.message}`);

          return of(result as T);
        };
      }
      private log(message: string) {
        console.log(`error: ${message}`);
      }
}
