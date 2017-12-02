import { TestBed, inject } from '@angular/core/testing';

import { ResultListingService } from './result-listing.service';

describe('ResultListingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultListingService]
    });
  });

  it('should be created', inject([ResultListingService], (service: ResultListingService) => {
    expect(service).toBeTruthy();
  }));
});
