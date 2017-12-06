import {Component, OnInit} from '@angular/core';
import {AgendaListItem, City, SubRegion, Region} from "../types";
import {ActivatedRoute} from "@angular/router";
import {SubregionService} from "../services/subregion.service";
import {RegionService} from "../services/region.service";
import {MatDialog, MatDialogRef} from "@angular/material";
import {DateDialogComponent} from "./date-dialog/date-dialog.component";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  city: City;
  subregion: SubRegion;
  region: Region;


  constructor(private route: ActivatedRoute, public dialog: MatDialog, private regions: RegionService, private subregions: SubregionService) {
  }


  ngOnInit() {
    this.city = this.route.snapshot.data['city'];
    this.regions.getFor(this.city.region).subscribe(data => this.region = data);
    this.subregions.getFor(this.city.subregion).subscribe(data => this.subregion = data);
    console.log("Resolving city to " + this.city.name)
  }

  createDialog($event) : void{
    console.log("Opening");
    let dialogRef = this.dialog.open(DateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
