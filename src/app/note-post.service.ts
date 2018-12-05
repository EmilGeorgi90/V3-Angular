import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/Http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';
import { MessageService } from './message.service';

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


  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  getNotes(): Observable<Note[]> {
    const temp = this.http.get<Note[]>(this.noteUrl)
    .pipe(
      tap(_ => this.log('fetched notes')),
      catchError(this.handleError('getNotes', []))
      );
      temp.subscribe(notes => this.notes = notes, null);
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

  getNote(id: number): Observable<Note> {
    const url = `${this.noteUrl}/${id}`;
    return this.http.get<Note>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Note>(`getNote id=${id}`))
      );
  }


  addNote (note: Note): Observable<Note> {
    const temp = this.http.post<Note>(this.noteUrl, note, httpOptions)
    .pipe(tap((_note: Note) => this.log(`added note w/ id=${_note.id}`)),
    catchError(this.handleError<Note>('addNote')))
    temp.subscribe(tempnote => {
    this.notes.push(tempnote);
    }
  );
  return temp;
}

  deleteNote (note: Note): Observable<Note> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.noteUrl}/${id}`;
    return this.http.delete<Note>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${note.id}`)),
      catchError(this.handleError<any>('deleteNote'))
      );
  }
  updateNote (note: Note): Observable<Note> {
    return this.http.put(this.noteUrl, note, httpOptions)
    .pipe(
      tap(_ => this.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>('updateNote'))
      );
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
    this.messageService.add(`HeroService: ${message}`);
  }
  }
