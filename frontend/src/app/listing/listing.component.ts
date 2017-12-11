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
  currentTab: number = 0;
  currentRegionsURL: URL;
  currentSubregionsURL: URL;
  currentCitiesURL: URL;

  constructor(private router: Router, private cities: CityService) {
  }

  updateTab($index) {
    this.currentTab = $index;
  }

  updateRegions($e: Entity) {
    console.log('Updating regions with ' + $e.url);
    this.currentRegionsURL = $e.url;
  }

  updateSubregions($e: Entity) {
    console.log('Updating subregions with ' + $e.url);
    this.currentSubregionsURL = $e.url;
    this.currentTab = 1;
  }

  updateCities($e: Entity) {
    console.log('Updating cities with ' + $e.url);
    this.currentCitiesURL = $e.url;
    this.currentTab = 2;
  }

  viewAgendas($e: Entity) {
    this.cities.getFor($e.url);
    console.log('Navigating to Cities');
    this.router.navigate(['cities/' + $e.id]);
  }
}
