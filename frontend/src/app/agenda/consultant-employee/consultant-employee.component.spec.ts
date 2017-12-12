import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantEmployeeComponent } from './consultant-employee.component';

describe('ConsultantEmployeeComponent', () => {
  let component: ConsultantEmployeeComponent;
  let fixture: ComponentFixture<ConsultantEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
