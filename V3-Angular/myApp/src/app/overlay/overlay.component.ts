import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  image = '';
  public note: Note;
  EditedForm: FormGroup;
  loading = false;
  submitted = false;
  @Input() overlayWidthInput: number;
  @Output() overlayClose = new EventEmitter<number>();
  @Output() Add = new EventEmitter<Note>();

  // tslint:disable-next-line:max-line-length
  constructor(private noteService: NotePostService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private AuthorService: AuthenticationService) { }

  ngOnInit() {
    this.EditedForm = this.formBuilder.group({
      title: ['', Validators.required],
      context: ['', Validators.required],
      image: ['', Validators.required],
    });
    if (this.note !== undefined) {
    this.note.image = this.note.image.split('/')[this.note.image.split('/').length - 1];
    this.EditedForm.setValue({title: this.note.title, context: this.note.context, image: this.note.image});
  }
}
  set f(value: any) {console.log(value); console.log(this.EditedForm); }
  get f() { return this.EditedForm.controls; }

  add(title: string, context: string, image: string): void {
    const note = new Note(title, context, '../assets/img/' + image);
    note.user = this.AuthorService.currentUserValue;
    this.activeModal.close(note);
  }
  onSelectionChange(Image) {
    this.image = Image;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.EditedForm.invalid) {
        return;
    }
    this.loading = true;
    const note = this.EditedForm.value as Note;
    note.user = this.AuthorService.currentUserValue;
    this.activeModal.close(note);
  }
}
