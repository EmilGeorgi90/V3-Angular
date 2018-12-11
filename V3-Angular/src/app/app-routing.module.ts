import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'note', component: NoteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
