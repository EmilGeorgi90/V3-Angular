import { Component, EventEmitter, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverlayComponent } from '../overlay/overlay.component';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Input() notes: Note[];
  @Input() numberInProcent: number;
  faPlusSquare = faPlusSquare;
  @Output() overlayWidth = new EventEmitter<number>();

  constructor(private noteService: NotePostService, private modalService: NgbModal) { }

  ngOnInit() {
    this.numberInProcent = 100;
    this.interval();
    }

  interval() {
    setInterval(() => this.calcGreenArea(), 60000);
  }

  public calcGreenArea(): number {
    this.noteService.CalcGreenSpace().subscribe(number => this.numberInProcent = number);
    return Math.round(this.numberInProcent);
}

  openNav() {
    // this.overlayWidth.emit(100);
    const modalRef = this.modalService.open(OverlayComponent);
    modalRef.componentInstance.overlayWidth = 100;
  }

}
