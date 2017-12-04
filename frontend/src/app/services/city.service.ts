import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {ResultListingService} from "./result-listing.service";
import {Place, City} from "../types";

@Injectable()
export class CityService extends ResultListingService<City> {
  getType(): string {
    return "cities";
  }

  constructor(backend: BackendService) {
    super(backend);
  }

}
