import {Injectable} from '@angular/core';
import {ResultListingService} from "./result-listing.service";
import {BackendService} from "./backend.service";
import {Place, Region} from "../types";


@Injectable()
export class RegionService extends ResultListingService<Region> {
  getType(): string {
    return "regions";
  }

  enrich(o: Region): Region {
    o.subdivisions = o.subregions;
    o.subdivisionRoute = "/browse/subregions";
    return o;
  }

  constructor(backend: BackendService) {
    super(backend);
  }

}
