import { TestBed, inject } from '@angular/core/testing';
import {CityResolver} from "./city.resolver";


describe('AgendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityResolver]
    });
  });

  it('should be created', inject([CityResolver], (service: CityResolver) => {
    expect(service).toBeTruthy();
  }));
});
