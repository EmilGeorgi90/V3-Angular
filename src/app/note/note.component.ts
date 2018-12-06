import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
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
  public number: any;
  @Input() notes: Note[];
  constructor(private noteService: NotePostService) { }
  ngAfterViewInit() {
    }
  ngOnInit() {
  }
  delete(note: Note): void {
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note).subscribe();
  }

}
