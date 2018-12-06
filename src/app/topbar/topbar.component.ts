import { Component, EventEmitter, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, AfterViewInit {
  private notes: Note[];
  numberInProcent: number;
  faPlusSquare = faPlusSquare;
  overlayWidth = 0;
  constructor(private noteService: NotePostService) { }
  ngOnInit() {
    this.numberInProcent = 100;
    this.getNotes();
  }
  ngAfterViewInit() {
    this.interval();
  }
  interval() {
    setInterval(() => this.calcGreenArea(), 60000);
  }
  public calcGreenArea(): number {
    this.noteService.CalcGreenSpace().subscribe(number => this.numberInProcent = number);
    return this.numberInProcent;
}
public getNotes(): void {
  this.noteService.getNotes().subscribe(note => this.notes = note, error => console.log(error), () => this.calcGreenArea());
}
  openNav() {
    this.overlayWidth = 100;
  }
  closeNav(){
    this.overlayWidth = 0;
  }
  add(title: string, date: Date, context: string, image: string): void {
    const note = new Note(title, date, context, '../assets/img/' + image);
    this.noteService.addNote(note as Note)
    .subscribe(_note => {
        this.notes.push(_note);
    });
    this.closeNav();
  }
}
