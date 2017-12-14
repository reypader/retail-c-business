import { TestBed, inject } from '@angular/core/testing';

import { PoliticianService } from './politician.service';

describe('PoliticianService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoliticianService]
    });
  });

  it('should be created', inject([PoliticianService], (service: PoliticianService) => {
    expect(service).toBeTruthy();
  }));
});
