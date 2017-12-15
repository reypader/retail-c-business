import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entity, PaginatedResult, Place} from '../../types';
import {ResultListingService} from '../../services/result-listing.service';
import {RegionService} from '../../services/region.service';
import {SubregionService} from '../../services/subregion.service';
import {CityService} from '../../services/city.service';

export abstract class GridComponent implements OnInit {

  _currentURL: URL;
  _currentName: string;
  @Output() itemSelected = new EventEmitter<Entity>();
  currentPage: PaginatedResult<Place>;
  resultList: Place[] = [];

  constructor(private service: ResultListingService<Place>) {
    this.currentPage = {} as PaginatedResult<Place>;
    this.currentPage.results = [];
    console.log('init');
  }


  @Input() set currentURL(value: URL) {
    this._currentURL = value;
    this.getItems();
  }

  @Input() set currentName(value: string) {
    console.log('Current name ' + value);
    this._currentName = value;
  }

  ngOnInit(): void {
  }

  select(url: URL, id: number, name: string): void {
    console.log('Selected ' + url + ' ' + name);
    this.itemSelected.emit({id: id, url: url, name: name} as Entity);
  }

  getItems(): void {
    this.resultList = [];
    if (this._currentURL) {
      this.service.getListFor(this._currentURL).delay(1000).subscribe(page => {
        this.collectResult(page);
      });
    } else {
      this.service.getList().delay(1000).subscribe(page => {
        this.collectResult(page);
      });
    }
  }

  next(): void {
    console.log('Fetching next items');
    this.service.getNext(this.currentPage).subscribe(page => {
      this.collectResult(page);
    });
  }

  private collectResult(page: PaginatedResult<Place>) {
    this.currentPage = page;
    this.resultList = this.resultList.concat(page.results);
  }

}

@Component({
  selector: 'region-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class RegionGridComponent extends GridComponent {

  constructor(regions: RegionService) {
    super(regions);
  }

}

@Component({
  selector: 'subregion-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class SubregionGridComponent extends GridComponent {

  constructor(subregions: SubregionService) {
    super(subregions);
  }

}

@Component({
  selector: 'city-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class CityGridComponent extends GridComponent {

  constructor(city: CityService) {
    super(city);
  }

}
