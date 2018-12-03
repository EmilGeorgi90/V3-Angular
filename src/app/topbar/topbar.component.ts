import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  private _notes: Note[];
  private _numberInProcent;
  faPlusSquare = faPlusSquare;
  @Output() loaded = new EventEmitter<boolean>();

  @Input()
  set numberInProcent(number: number) {
    this._numberInProcent = number;
  }
  get numberInProcent(): number { return this._numberInProcent; }
  @Input()
  set notes(note: Note[]) {
    this._notes = note;
  }
  get notes(): Note[] { return this._notes; }
  constructor(private noteService: NotePostService) { }
  ngOnInit() {
  }
  calcProcentOfGreen(notes: Note[]): number {
    if (notes === undefined) {
      console.log(notes);
      this.numberInProcent = 0;
      return 0;
    } else if (this.notes !== undefined) {
      this.loaded.emit(true);
      return this.numberInProcent = this.noteService.windowonload(this.notes);
     } else {
     this.notes = notes;
    console.log(this.notes);
    return this.numberInProcent = this.noteService.windowonload(notes);
  }
}
  openNav() {
    document.getElementById('myNav').style.height = '100%';
    document.getElementById('myNav').style.width = '100%';
  }
}
