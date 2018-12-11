import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './in-memory.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { TopbarComponent } from './topbar/topbar.component';
import { IndexComponent } from './index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, far } from '@fortawesome/free-regular-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  entryComponents: [OverlayComponent],
  declarations: [
    AppComponent,
    NoteComponent,
    TopbarComponent,
    IndexComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryService, { dataEncapsulation: false }
    ),
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(far, faPlusSquare);
  }
 }
