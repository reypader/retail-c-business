import {Router} from '@angular/router';
import {Entity} from '../types';
import 'rxjs/add/operator/switchMap';
import {Component} from '@angular/core';
import {CityService} from '../services/city.service';

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {
  currentTab = 0;
  currentRegionsURL: URL;
  currentRegionsName: string;
  currentSubregionsURL: URL;
  currentSubegionsName = 'California';
  currentCitiesURL: URL;
  currentCitiesName: string;

  constructor(private router: Router, private cities: CityService) {
  }

  updateTab($index) {
    this.currentTab = $index;
  }

  updateRegions($e: Entity) {
    console.log('Updating regions with ' + $e.url);
    this.currentRegionsURL = $e.url;
    this.currentRegionsName = $e.name;
  }

  updateSubregions($e: Entity) {
    console.log('Updating subregions with ' + $e.url);
    this.currentSubregionsURL = $e.url;
    this.currentSubegionsName = $e.name;
    this.currentTab = 1;
  }

  updateCities($e: Entity) {
    console.log('Updating cities with ' + $e.url);
    this.currentCitiesURL = $e.url;
    this.currentCitiesName = $e.name;
    this.currentTab = 2;
  }

  viewAgendas($e: Entity) {
    this.cities.getFor($e.url);
    console.log('Navigating to Cities');
    this.router.navigate(['cities/' + $e.id]);
  }
}
