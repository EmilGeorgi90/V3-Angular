import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergiComponent } from './energi.component';

describe('EnergiComponent', () => {
  let component: EnergiComponent;
  let fixture: ComponentFixture<EnergiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
