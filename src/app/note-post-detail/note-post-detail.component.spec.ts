import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePostDetailComponent } from './note-post-detail.component';

describe('NotePostDetailComponent', () => {
  let component: NotePostDetailComponent;
  let fixture: ComponentFixture<NotePostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotePostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
