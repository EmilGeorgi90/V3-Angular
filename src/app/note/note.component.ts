import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, AfterViewInit {
  private timer: any;
  public number: any;
  public notes: Note[];
  constructor(private noteService: NotePostService) { }
  ngAfterViewInit() {
      this.interval();
    }
  ngOnInit() {
    this.getNotes();
  }
  interval() {
    this.timer = setInterval(() => this.calcGreenArea(), 60000);
  }
  public getNotes(): void {
    if (this.notes === undefined) {
    this.noteService.getNotes().subscribe(note => this.notes = note, error => console.log(error), () => this.calcGreenArea());
  }
}
  public calcGreenArea(): number {
    if (this.notes === undefined) {
      this.getNotes();
    } else {
      this.number = this.noteService.windowonload(this.notes);
      return this.number;
    }
}
  add(title: string, date: Date, context: string, image: string): void {
    const note = new Note(title, date, context, '../assets/img/' + image);
    this.noteService.addNote(note as Note)
    .subscribe(_note => {
        this.notes.push(_note);
    });
    this.closeNav();
  }
  delete(note: Note): void {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note).subscribe();
  }
  closeNav() {
    document.getElementById('myNav').style.height = '0%';
    document.getElementById('myNav').style.width = '0%';
  }
}
