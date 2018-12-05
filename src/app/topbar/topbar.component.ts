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
  private numberInProcent: Number = 0;
  faPlusSquare = faPlusSquare;
  loaded: Promise<Boolean>;
  constructor(private noteService: NotePostService) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  calcProcentOfGreen(notes: Note[]): Number {
    if (notes === undefined) {
      this.numberInProcent = 0;
      return 0;
    } else if (this.notes !== undefined) {
      this.loaded = Promise.resolve(true);
      return this.numberInProcent = this.noteService.windowonload(this.notes);
    } else {
      this.notes = notes;
      this.numberInProcent = this.noteService.windowonload(notes);
      this.loaded = Promise.resolve(true);
      console.log(this.loaded);
      return this.numberInProcent;
    }
  }
  openNav() {
    document.getElementById('myNav').style.height = '100%';
    document.getElementById('myNav').style.width = '100%';
  }
}
