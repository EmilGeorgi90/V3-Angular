import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotePostService } from '../note-post.service';
import { TopbarComponent } from '../topbar/topbar.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, AfterViewInit {
  private timer: any;
  public number: any;
  public notes: Note[];
  constructor(private noteService: NotePostService) { }
  ngAfterViewInit() {
    }
  ngOnInit() {
    this.getNotes();
  }

  public getNotes(): void {
    if (this.notes === undefined) {
    this.noteService.getNotes().subscribe(note => this.notes = note, error => console.log(error));
  }
}


  delete(note: Note): void {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note).subscribe();
  }

}
