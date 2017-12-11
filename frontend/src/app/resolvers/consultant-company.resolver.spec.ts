import {inject, TestBed} from '@angular/core/testing';
import {ConsultantCompanyResolver} from './consultant-company.resolver';


describe('ConsultantCompanyResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantCompanyResolver]
    });
  });

  it('should be created', inject([ConsultantCompanyResolver], (service: ConsultantCompanyResolver) => {
    expect(service).toBeTruthy();
  }));
});
