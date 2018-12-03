import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotePostService } from '../note-post.service'
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public notes: Note[];

  constructor(private noteService: NotePostService) { }

  
  ngOnInit() {
    this.getNotes();
    this.noteService.windowonload()
  }
  public getNotes(): void {
    this.noteService.getNotes().subscribe(notes => this.notes = notes);
  }
  add(title: string, date: Date, context: string, image: string): void {
    
    let note = new Note();
    note.title = title;
    note.date = date;
    note.context = context;
    note.image = "../assets/img/" + image;
    this.noteService.addNote(note as Note)
    .subscribe(note => {this.notes.push(note)});
    this.closeNav()
    this.calcProcentOfGreen()
  }
  delete(note: Note): void{
    this.notes = this.notes.filter(n => n !== note);
    this.noteService.deleteNote(note).subscribe();
  }
  closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.width = "0%";
  }
  
  calcProcentOfGreen() : void{
    document.getElementById("progressBar").style.width = document.getElementsByClassName("green-bar").length / (document.getElementsByClassName("green-bar").length + document.getElementsByClassName("red-bar").length) * 100 + "%"
    document.getElementById("progressText").innerText = document.getElementsByClassName("green-bar").length / (document.getElementsByClassName("green-bar").length + document.getElementsByClassName("red-bar").length) * 100 + "%"
  }
}
