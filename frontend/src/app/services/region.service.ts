import {Injectable} from '@angular/core';
import {ResultListingService} from "./result-listing.service";
import {BackendService} from "./backend.service";
import {Place} from "../types";


@Injectable()
export class RegionService extends ResultListingService<Place> {
  getType(): string {
    return "regions";
  }

  constructor(backend: BackendService) {
    super(backend);
  }

}
