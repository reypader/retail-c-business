import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {PaginatedResult, Place, Entity} from '../../types';
import {ResultListingService} from '../../services/result-listing.service';
import {RegionService} from '../../services/region.service';
import {SubregionService} from '../../services/subregion.service';
import {CityService} from '../../services/city.service';

export abstract class GridComponent implements OnInit {

  @Output() itemSelected = new EventEmitter<Entity>();
  _currentURL: URL;
  currentPage: PaginatedResult<Place>;
  resultList: Place[] = [];

  constructor(private service: ResultListingService<Place>) {
    this.currentPage = {} as PaginatedResult<Place>;
    this.currentPage.results = [];
    console.log('init')
  }

  ngOnInit(): void {
  }

  select(url: URL, id: number): void {
    console.log('Selected ' + url);
    this.itemSelected.emit({id: id, url: url} as Entity);
  }

  private collectResult(page: PaginatedResult<Place>) {
    this.currentPage = page;
    this.resultList = this.resultList.concat(page.results);
  }

  @Input() set currentURL(value: URL) {
    this._currentURL = value;
    this.getItems();
  }

  getItems(): void {
    this.resultList = [];
    if (this._currentURL) {
      this.service.getListFor(this._currentURL).subscribe(page => {
        this.collectResult(page);
      });
    } else {
      this.service.getList().subscribe(page => {
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
