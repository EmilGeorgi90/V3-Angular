import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/Http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class NotePostService {

  public numberInprocent = new BehaviorSubject(0);
  date: Date = new Date();
  notes: Note[];
  green = 0;
  red = 0;
  private noteUrl = 'http://emil376g.aspitcloud.dk/phpApi/read.php';


  constructor(private http: Http) { }

  getNotes(): Observable<Note[]> {
    const temp = this.http.get(this.noteUrl)
    .pipe(
      map((res: Response) => res.json()),
      tap(_ => this.log('fetched notes')),
      catchError(this.handleError('getNotes', []))
      );
      temp.subscribe(notes => this.notes = notes['records'], error => console.log(error), () => this.CalcGreenSpace());
      return temp;
  }

  addNote (note: Note): Observable<Note> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const temp = this.http.post('http://emil376g.aspitcloud.dk/phpApi/create.php', note, options)
    .pipe(map((res:Response) => res.json()), tap((_note: Note) => this.log(`added note w/ id=${note.id}`)),
    catchError(this.handleError<Note>('addNote')));
    console.log(note);
  return temp;
}

  GetProcentOfGreenSpace(): Observable<number> {
    return this.numberInprocent;
  }

  CalcGreenSpace(): Observable<number> {
    this.mathGreenSpace(this.notes);
    this.numberInprocent.next(this.green / (this.red + this.green) * 100 -
    (Math.round(((Date.now() - this.date.setHours(8)) / 1000 / 60 / 5))));
    return this.numberInprocent.asObservable();
  }

  private mathGreenSpace(note: Note[]) {
    let greencolor = 0;
    let redcolor = 0;
    note.forEach(function(value) {
      if (value.image === '../assets/img/happy.svg') {
        greencolor++;
      } else if (value.image === '../assets/img/vomited.svg') {
         redcolor++;
      } else if (value.image === '../assets/img/sad.svg') {
        redcolor++;
      } else if (value.image === '../assets/img/happy-real.svg') {
        greencolor++;
      }
    });
    this.red = redcolor;
    this.green = greencolor;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
  }
