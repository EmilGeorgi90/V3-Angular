import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/Http';
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
  private noteUrl = 'api/notes';


  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    const temp = this.http.get<Note[]>(this.noteUrl)
    .pipe(
      tap(_ => this.log('fetched notes')),
      catchError(this.handleError('getNotes', []))
      );
      temp.subscribe(notes => this.notes = notes, error => console.log(error), () => this.CalcGreenSpace());
      return temp;
  }

  getNotesNo404<Data>(id: number): Observable<Note> {
    const url = `${this.noteUrl}/?id=${id}`;
    return this.http.get<Note[]>(url)
    .pipe(
      map(notes => notes[0]),
      tap(n => {
        const outcome = n ? 'fetched' : 'did not find';
        this.log(`${outcome} hero ud=${id}`);
      }),
      catchError(this.handleError<Note>(`getHero id=${id}`))
    );
  }



  addNote (note: Note): Observable<Note> {
    const temp = this.http.post<Note>(this.noteUrl, note, httpOptions)
    .pipe(tap((_note: Note) => this.log(`added note w/ id=${note.id}`)),
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
