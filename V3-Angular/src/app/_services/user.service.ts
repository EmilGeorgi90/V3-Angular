import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: Http) { }
    config = '';
    // getAll() {
    //     return this.http.get<User[]>(`${config.apiUrl}/users`);
    // }

    // getById(id: number) {
    //     return this.http.get(`${config.apiUrl}/users/${id}`);
    // }

    register(user: User) {
                // tslint:disable-next-line:max-line-length
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'});
        const options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(user));
        const temp = this.http.post(`http://emil376g.aspitcloud.dk/api/public/api/register`, JSON.stringify(user), options)
        // tslint:disable-next-line:max-line-length
        .pipe(map((res: Response) => res.json()), tap((_user: User) => _user));
        return temp;
    }

    // update(user: User) {
    //     return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }
}
