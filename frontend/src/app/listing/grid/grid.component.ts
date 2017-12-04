import {Component, OnInit, Input} from '@angular/core';
import {PaginatedResult, Place} from "../../types";
import {Router} from "@angular/router";
import {unescape} from "querystring";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() resultList: PaginatedResult<Place>

  constructor( private router: Router) {
  }

  ngOnInit() {
  }

  navigate(p:Place){
    console.log("Navigating to "+ p.subdivisionRoute);
    this.router.navigate([p.subdivisionRoute], { queryParams: {  parent_code: p.id} });
  }

}
