import {Component, OnInit, Input} from '@angular/core';
import {PaginatedResult, Place} from "../../types";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() resultList: PaginatedResult<Place>

  constructor() {
  }

  ngOnInit() {
  }

}
