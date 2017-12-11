import {inject, TestBed} from '@angular/core/testing';

import {ConsultantCompanyService} from './consultant-company.service';

describe('ConsultantCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantCompanyService]
    });
  });

  it('should be created', inject([ConsultantCompanyService], (service: ConsultantCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
