import {Component, OnInit} from '@angular/core';
import {AgendaListItem, City, SubRegion, Region} from "../types";
import {ActivatedRoute} from "@angular/router";
import {SubregionService} from "../services/subregion.service";
import {RegionService} from "../services/region.service";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  city: City;
  subregion: SubRegion;
  region: Region;


  constructor(private route: ActivatedRoute, private regions: RegionService, private subregions: SubregionService) {
  }


  ngOnInit() {
    this.city = this.route.snapshot.data['city'];
    this.regions.getFor(this.city.region).subscribe(data => this.region = data);
    this.subregions.getFor(this.city.subregion).subscribe(data => this.subregion = data);
    console.log("Resolving city to " + this.city.name)
  }

}
