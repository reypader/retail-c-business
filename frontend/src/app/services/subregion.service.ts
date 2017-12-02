import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {ResultListingService} from "./result-listing.service";
import {Place} from "../types";

@Injectable()
export class SubregionService extends ResultListingService<Place> {
  getType(): string {
    return "subregions";
  }

  constructor(backend: BackendService) {
    super(backend);
  }

}
