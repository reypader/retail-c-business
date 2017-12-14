import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeCreateDialogComponent } from './attendee-create-dialog.component';

describe('AttendeeCreateDialogComponent', () => {
  let component: AttendeeCreateDialogComponent;
  let fixture: ComponentFixture<AttendeeCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeeCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
