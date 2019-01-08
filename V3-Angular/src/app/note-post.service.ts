import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/Http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './_models';
import { Note } from './note';
import { AuthenticationService } from './_services/authentication.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class NotePostService {

  public numberInprocent = new BehaviorSubject(0);
  CurrUser: any;
  date: Date = new Date(new Date().setHours(8));
  notes: Note[];
  green = 0;
  red = 0;
  private noteUrl = `https://emil376g.aspitcloud.dk/api/public/api/notes/`;


  constructor(private http: Http, private autherService: AuthenticationService) {
    autherService.currentUser.subscribe(_user => this.CurrUser = _user);
   }

  getNotes(): Observable<Note[]> {
    const temp = this.http.get(this.noteUrl + this.CurrUser.data.id + '')
    .pipe(
      map((res: Response) => res.json()),
      tap(_ => this.log('fetched notes')),
      catchError(this.handleError('getNotes', []))
      );
      temp.subscribe(notes => this.notes = notes, error => console.log(error), () => this.CalcGreenSpace());
      return temp;
  }

  addNote (note: Note): Observable<Note> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    note.image = '../assets/img/' + note.image;
    console.log(note);
    // tslint:disable-next-line:max-line-length
    return this.http.post('https://emil376g.aspitcloud.dk/api/public/api/notes', JSON.stringify({title: note.title, user_id: note.user.data.id, context: note.context, image: note.image}), options)
    .pipe(map((res: Response) => res.json()), tap((_note: Note) => this.log(`added note w/ id=${note.id}`)),
    catchError(this.handleError<Note>('addNote')));
}
editNote (noteToEdit: Note, note: Note): Observable<Note> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  note.image = '../assets/img/' + note.image;
  // tslint:disable-next-line:max-line-length
  const temp = this.http.put('https://emil376g.aspitcloud.dk/api/public/api/notes/' + noteToEdit.id, JSON.stringify({title: note.title, context: note.context, image: note.image}), options)
  .pipe(map((res: Response) => res.json()), tap((_note: Note) => this.log(`added note w/ id=${_note.id}`)),
  catchError(this.handleError<Note>('addNote')));
return temp;
}
deleteNote (noteToDelete: Note): Observable<Note> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  // tslint:disable-next-line:max-line-length
  const temp = this.http.delete('https://emil376g.aspitcloud.dk/api/public/api/notes/' + noteToDelete.id, options)
  .pipe(map((res: Response) => res.json()), tap((_note: Note) => this.log(`deleted note w/ id=${noteToDelete.id}`)),
  catchError(this.handleError<Note>('addNote')));
return temp;
}

  GetProcentOfGreenSpace(): Observable<number> {
    return this.numberInprocent;
  }

  CalcGreenSpace(): Observable<number> {
    this.mathGreenSpace(this.notes);
    const math = Math.floor(100 + (this.green - this.red) - (Math.floor(((Date.now() - this.date.getTime()) / 1000 / 60 / 5))));
    let number = math > 0 ? math : 0;
    number = number > 100 ? 100 : number;
    this.numberInprocent.next(number);
    return this.numberInprocent.asObservable();
  }

  private mathGreenSpace(note: Note[]) {
    let greencolor = 0;
    let redcolor = 0;
    if (note !== undefined) {
    note.forEach((value) => {
      if (value.image === '../assets/img/happy.svg' && this.calcDate(value.date)) {
          greencolor += 20;
      } else if (value.image === '../assets/img/vomited.svg' && this.calcDate(value.date)) {
         redcolor += 20;
      } else if (value.image === '../assets/img/Sad.svg' && this.calcDate(value.date)) {
          redcolor += 10;
      } else if (value.image === '../assets/img/happy-real.svg' && this.calcDate(value.date)) {
          greencolor += 10;
      }
    });
  }
    this.red = redcolor;
    this.green = greencolor;
  }
  private calcDate(date: Date): boolean {
    const datelookup = new Date(date);
    const currDate = new Date();
    // tslint:disable-next-line:max-line-length
    return datelookup.getDate() === currDate.getDate();
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`${message}`);
    }
  }
