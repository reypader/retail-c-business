import {Injectable} from '@angular/core';
import {ResultListingService} from './result-listing.service';
import {BackendService} from './backend.service';
import {Region} from '../types';


@Injectable()
export class RegionService extends ResultListingService<Region> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'regions';
  }

  enrich(o: Region): Region {
    o.subdivisions = o.subregions;
    return o;
  }

}
