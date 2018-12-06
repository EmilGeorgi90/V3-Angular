import { Component, OnInit, Output } from '@angular/core';
import {Note} from '../note';
import {NotePostService} from '../note-post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  Notes: Note[] = [];
  numberInProcent: number;
  Overlay: number;

  constructor(private NoteService: NotePostService) { }

  ngOnInit() {
    this.getNotes();
    this.NoteService.GetProcentOfGreenSpace().subscribe(number => this.numberInProcent = number);
  }

  getNotes(): void {
    this.NoteService.getNotes().subscribe(notes => this.Notes = notes);
  }

  overlayWidth(overlayWitdh: number) {
    this.Overlay = overlayWitdh;
  }

  add(note: Note): void {
    this.NoteService.addNote(note as Note)
    .subscribe(_note => {
        this.Notes.push(_note);
    });
  }
}
