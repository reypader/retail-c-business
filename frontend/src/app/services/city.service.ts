import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {ResultListingService} from "./result-listing.service";
import {Place} from "../types";

@Injectable()
export class CityService extends ResultListingService<Place> {
  getType(): string {
    return "cities";
  }

  constructor(backend: BackendService) {
    super(backend);
  }

}
