import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
import { TopbarComponent } from '../topbar/topbar.component';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, AfterViewInit {
  private timer: any;
  public notes: Note[];
  private topbarCmponent: TopbarComponent = new TopbarComponent(this.noteService);
  constructor(private noteService: NotePostService) { }
  ngAfterViewInit() {
      this.interval();
      this.calcGreenArea();
    }
  ngOnInit() {
    this.getNotes();
  }
  interval() {
    this.timer = setInterval(() => this.calcGreenArea(), 60000);
  }
  public getNotes(): void {
    if (this.notes === undefined) {
    this.noteService.getNotes().subscribe(note => this.notes = note);
  }
}
  public calcGreenArea(): number {
    if (this.notes === undefined) {
      this.getNotes();
      console.log(this.notes);
    } else {
      console.log(this.notes);
      return this.topbarCmponent.calcProcentOfGreen(this.notes);
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
