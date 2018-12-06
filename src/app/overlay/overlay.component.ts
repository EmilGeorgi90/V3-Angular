import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  @Input() overlayWidthInput: number;
  @Output() overlayClose = new EventEmitter<number>();
  @Output() Add = new EventEmitter<Note>();

  constructor(private noteService: NotePostService) { }

  ngOnInit() {
  }

  add(title: string, date: Date, context: string, image: string): void {
    const note = new Note(title, date, context, '../assets/img/' + image);
    this.Add.emit(note);
    this.closeNav();
  }

  closeNav() {
    this.overlayClose.emit(0);
  }
}
