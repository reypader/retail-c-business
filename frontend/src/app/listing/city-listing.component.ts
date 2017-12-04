import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RegionService} from "../services/region.service";
import {SubregionService} from "../services/subregion.service";
import {CityService} from "../services/city.service";
import {PaginatedResult, Place} from "../types";
import {ListingComponent} from "./listing.component";

@Component({
  selector: 'city-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class CityListingComponent extends ListingComponent {

  constructor(route: ActivatedRoute, cities: CityService) {
    super(route, cities);
  }

  createFilter(params: ParamMap): Object {
    const parent_code = params['parent_code'];
    return {
      subregion__id: parent_code
    }
  }

}
