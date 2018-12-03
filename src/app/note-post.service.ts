import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/Http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';
import { MessageService } from './message.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotePostService {
  green = 0;
  red = 0;
  private noteUrl = 'api/notes';
  notes: Note[];
  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  
  getNotes() : Observable<Note[]> { 
    return this.http.get<Note[]>(this.noteUrl)
    .pipe(
      tap(_ => this.log('fetched notes')),
      catchError(this.handleError('getNotes', []))
      )
  }

  getNotesNo404<Data>(id: number): Observable<Note> {
    const url = `${this.noteUrl}/?id=${id}`;
    return this.http.get<Note[]>(url)
    .pipe(
      map(notes => notes[0]),
      tap(n => {
        const outcome = n ? 'fetched' : 'did not find';
        this.log(`${outcome} hero ud=${id}`)
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


  addNote (note: Note): Observable<Note>{
    return this.http.post<Note>(this.noteUrl, note, httpOptions)
    .pipe(tap((note: Note) => this.log(`added note w/ id=${note.id}`)),
    catchError(this.handleError<Note>('addNote'))
    );
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

  windowonload() : number{
    this.getNotes().subscribe(note => this.notes = note, this.handleError(), () => this.CalcGreenSpace(this.notes));
    return this.green / (this.red + this.green) * 100;
  }

  CalcGreenSpace(note: Note[]){
    let greencolor = 0;
    let redcolor = 0
    note.forEach(function(value){
      if(value.image == '../assets/img/happy.svg'){
        greencolor++;
      }else if(value.image == '../assets/img/vomited.svg'){
         redcolor++;
      }
    })
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
