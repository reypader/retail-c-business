import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {RegionService} from "../services/region.service";
import {SubregionService} from "../services/subregion.service";
import {CityService} from "../services/city.service";
import {PaginatedResult, Place} from "../types";
import {ListingComponent} from "./listing.component";

@Component({
  selector: 'region-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class RegionListingComponent extends ListingComponent {

  constructor(route: ActivatedRoute, regions: RegionService) {
    super(route, regions);
  }

  createFilter(params: Params): Object {
    const parent_code = params['parent_code'];
    return {
      id: parent_code
    };
  }

}
