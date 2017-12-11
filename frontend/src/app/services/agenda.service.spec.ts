import {inject, TestBed} from '@angular/core/testing';

import {AgendaService} from './agenda.service';

describe('AgendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendaService]
    });
  });

  it('should be created', inject([AgendaService], (service: AgendaService) => {
    expect(service).toBeTruthy();
  }));
});
