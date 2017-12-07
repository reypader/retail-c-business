import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {ResultListingService} from './result-listing.service';
import {Place, SubRegion} from '../types';

@Injectable()
export class SubregionService extends ResultListingService<SubRegion> {
  getType(): string {
    return 'subregions';
  }

  enrich(o: SubRegion): SubRegion {
    o.subdivisions = o.cities;
    return o;
  }

  constructor(backend: BackendService) {
    super(backend);
  }

}
