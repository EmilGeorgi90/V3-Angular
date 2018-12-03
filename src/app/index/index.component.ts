import { Component, OnInit, Output } from '@angular/core';
import {Note} from '../note';
import {NotePostService} from '../note-post.service'
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  Notes: Note[] = [];

  constructor(private NoteService: NotePostService) { }

  ngOnInit() {
  }
  getNotes(): void {
    this.NoteService.getNotes().subscribe(notes => this.Notes = notes)
  }


}
