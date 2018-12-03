import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Note } from '../note';
import { NotePostService } from '../note-post.service'
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  constructor(private noteService: NotePostService) { }
  faPlusSquare = faPlusSquare;
  ngOnInit() {
    
  }
  calcProcentOfGreen() : number{
   return Math.round(this.noteService.windowonload())
  }
  openNav() {
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav").style.width = "100%";
  }
}
