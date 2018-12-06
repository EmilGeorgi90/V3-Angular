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
  @Input() notes: Note[];
  @Input() numberInProcent: number;
  faPlusSquare = faPlusSquare;
  @Output() overlayWidth = new EventEmitter<number>();
  constructor(private noteService: NotePostService) { }
  ngOnInit() {
    this.numberInProcent = 100;
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
  openNav() {
    this.overlayWidth.emit(100);
    console.log(this.overlayWidth);
  }
  add(title: string, date: Date, context: string, image: string): void {
    const note = new Note(title, date, context, '../assets/img/' + image);
    this.noteService.addNote(note as Note)
    .subscribe(_note => {
        this.notes.push(_note);
    });
  }
}
