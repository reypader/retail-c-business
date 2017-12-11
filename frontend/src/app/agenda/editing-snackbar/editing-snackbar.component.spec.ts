import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditingSnackbarComponent} from './editing-snackbar.component';

describe('EditingSnackbarComponent', () => {
  let component: EditingSnackbarComponent;
  let fixture: ComponentFixture<EditingSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditingSnackbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
