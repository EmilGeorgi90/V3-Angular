import { Component, EventEmitter, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Note } from '../note';
import { User } from '../_models';
import { NotePostService } from '../note-post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverlayComponent } from '../overlay/overlay.component';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  note: Note;
  @Input() numberInProcent: number;
  faPlusSquare = faPlusSquare;
  @Output() Add = new EventEmitter<Note>();

  constructor(private noteService: NotePostService, private modalService: NgbModal) { }

  ngOnInit() {
    this.interval();
    }

  interval() {
    setInterval(() => this.calcGreenArea(), 60000);
  }

  public calcGreenArea(): number {
    this.noteService.CalcGreenSpace().subscribe(number => this.numberInProcent = number > 0 ? number : 0);
    return Math.round(this.numberInProcent);
}

  openNav() {
    const modalRef = this.modalService.open(OverlayComponent);
    modalRef.componentInstance.overlayWidth = 100;
    modalRef.result.then(note => this.Add.emit(note), error => console.log(error));
  }
}
