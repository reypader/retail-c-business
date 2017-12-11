import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantCompanyComponent } from './consultant-company.component';

describe('ConsultantCompanyComponent', () => {
  let component: ConsultantCompanyComponent;
  let fixture: ComponentFixture<ConsultantCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
