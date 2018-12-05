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
  private numberInProcent: number;
  faPlusSquare = faPlusSquare;
  loaded: Promise<Boolean>;
  constructor(private noteService: NotePostService) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.interval();
  }
  interval() {
    setInterval(() => this.calcGreenArea(), 60000);
  }
  public calcGreenArea(): number {
    if (this.notes === undefined) {
      this.getNotes();
    } else {
      this.noteService.CalcGreenSpace().subscribe(number => this.numberInProcent = number);
      return this.numberInProcent;
    }
}
public getNotes(): void {
  if (this.notes === undefined) {
  this.noteService.getNotes().subscribe(note => this.notes = note, error => console.log(error), () => this.calcGreenArea());
}
}
  openNav() {
    document.getElementById('myNav').style.height = '100%';
    document.getElementById('myNav').style.width = '100%';
  }
}
