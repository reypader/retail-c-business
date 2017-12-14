import {Injectable} from '@angular/core';
import {Politician} from '../types';
import {ResultListingService} from './result-listing.service';
import {BackendService} from './backend.service';

@Injectable()
export class PoliticianService extends ResultListingService<Politician> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'politicians';
  }

}
