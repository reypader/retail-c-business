import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {PaginatedResult, Place} from "../types";
import {ResultListingService} from "../services/result-listing.service";
import 'rxjs/add/operator/switchMap';
import {Component} from "@angular/core";

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {
  currentTab: number = 0;
  currentRegionsURL: URL;
  currentSubregionsURL: URL;
  currentCitiesURL: URL;

  constructor() {
  }

  updateTab($index) {
    this.currentTab = $index;
  }

  updateRegions($url) {
    console.log("Updating regions with " + $url);
    this.currentRegionsURL = $url;
  }

  updateSubregions($url) {
    console.log("Updating subregions with " + $url);
    this.currentSubregionsURL = $url;
    this.currentTab = 1;
  }

  updateCities($url) {
    console.log("Updating cities with " + $url);
    this.currentCitiesURL = $url;
    this.currentTab = 2;
  }

  viewAgendas($url) {
    alert("Go to " + $url);
  }
}
