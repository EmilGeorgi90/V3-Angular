import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  image = '';
  @Input() overlayWidthInput: number;
  @Output() overlayClose = new EventEmitter<number>();
  @Output() Add = new EventEmitter<Note>();

  constructor(private noteService: NotePostService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  add(title: string, context: string, image: string): void {
    const note = new Note(title, new Date(), context, '../assets/img/' + image);
    this.activeModal.close(note);
  }
  onSelectionChange(Image) {
    this.image = Image;
  }
}
