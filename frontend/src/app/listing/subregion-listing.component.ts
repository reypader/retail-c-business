import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {RegionService} from "../services/region.service";
import {SubregionService} from "../services/subregion.service";
import {CityService} from "../services/city.service";
import {PaginatedResult, Place} from "../types";
import {ListingComponent} from "./listing.component";

@Component({
  selector: 'subregion-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class SubregionListingComponent extends ListingComponent {

  constructor(route: ActivatedRoute, subregions: SubregionService) {
    super(route, subregions);
  }

  createFilter(params: Params): Object {
    const parent_code = params['parent_code'];
    return {
      region__id: parent_code
    };
  }

}
