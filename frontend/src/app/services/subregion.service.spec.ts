import { TestBed, inject } from '@angular/core/testing';

import { SubregionService } from './subregion.service';

describe('SubregionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubregionService]
    });
  });

  it('should be created', inject([SubregionService], (service: SubregionService) => {
    expect(service).toBeTruthy();
  }));
});
