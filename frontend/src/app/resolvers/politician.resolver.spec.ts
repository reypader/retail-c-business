import {inject, TestBed} from '@angular/core/testing';
import {CityResolver} from './city.resolver';
import {PoliticianResolver} from './politician.resolver';


describe('PoliticianService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityResolver]
    });
  });

  it('should be created', inject([PoliticianResolver], (service: PoliticianResolver) => {
    expect(service).toBeTruthy();
  }));
});
