import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Note } from '../note';
import { OverlayComponent } from '../overlay/overlay.component';
import { ConfirmationDialogService } from '../shared/delete-confirm-dialog/confirmation-dialog.service';
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
  constructor(private modalService: NgbModal, private confirmationDialogService: ConfirmationDialogService) { }

  openEdit(currNote: Note) {
    // this.overlayWidth.emit(100);
    const modalRef = this.modalService.open(OverlayComponent);
    modalRef.componentInstance.overlayWidth = 100;
    modalRef.componentInstance.note = Object.assign({}, currNote);
    const _notes: Note[] = [];
    _notes.push(currNote);
    // tslint:disable-next-line:max-line-length
    modalRef.result.then(note => {if (note === 'delete') { this.openConfirmationDialog(currNote); } else { _notes.push(note); this.edit.emit(_notes); } }, error => console.log(error));
  }
  deleteNote(note: Note) {
    this.delete.emit(note);
  }
  public openConfirmationDialog(note: Note) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => this.deleteNote(note))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
