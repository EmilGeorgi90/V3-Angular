import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Note } from '../note';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent  {

  public number: any;
  @Input() notes: Note[];
  @Output() edit = new EventEmitter<Note[]>();
  @Output() delete = new EventEmitter<Note>();
  constructor(private modalService: NgbModal) { }

  openEdit(currNote: Note) {
    // this.overlayWidth.emit(100);
    const modalRef = this.modalService.open(OverlayComponent);
    modalRef.componentInstance.overlayWidth = 100;
    modalRef.componentInstance.note = Object.assign({}, currNote);
    const _notes: Note[] = [];
    _notes.push(currNote);
    modalRef.result.then(note => {_notes.push(note); this.edit.emit(_notes); }, error => console.log(error));
  }
  deleteNote(note: Note) {
    console.log(note);
    this.delete.emit(note);
  }
}
