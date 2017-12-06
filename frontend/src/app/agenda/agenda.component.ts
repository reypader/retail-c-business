import {Component, OnInit} from '@angular/core';
import {AgendaListItem, City, SubRegion, Region, Agenda} from "../types";
import {ActivatedRoute, Router} from "@angular/router";
import {SubregionService} from "../services/subregion.service";
import {RegionService} from "../services/region.service";
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {DateDialogComponent} from "./date-dialog/date-dialog.component";
import {EditingSnackbarComponent} from "./editing-snackbar/editing-snackbar.component";
import {AgendaService} from "../services/agenda.service";
import {CityService} from "../services/city.service";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  city: City;
  subregion: SubRegion;
  region: Region;
  newAgenda: Agenda;


  constructor(private route: ActivatedRoute, private cities: CityService, public dialog: MatDialog, private snackbar: MatSnackBar, private regions: RegionService, private subregions: SubregionService, private agendas: AgendaService) {
  }


  ngOnInit() {
    this.city = this.route.snapshot.data['city'];
    this.regions.getFor(this.city.region).subscribe(data => this.region = data);
    this.subregions.getFor(this.city.subregion).subscribe(data => this.subregion = data);
    console.log("Resolving city to " + this.city.name)
  }

  createDialog(scrollTarget): void {
    let dialogRef = this.dialog.open(DateDialogComponent);
    dialogRef.afterClosed().subscribe(result=> {
      let r = result as Date;
      this.newAgenda = {
        'new': true,
        city: this.city.url,
        date: r,
        dateString: r.toDateString()
      } as Agenda;
      this.snackbar.openFromComponent(EditingSnackbarComponent);
      scrollTarget.scrollIntoView();
    });
  }

  cancel($event): void {
    this.newAgenda = null
  }

  save($event): void {
    this.agendas.save(this.newAgenda)
      .switchMap(data=> this.cities.getFor(this.city.url))
      .subscribe(data=> {
        this.city = data;
        this.newAgenda = null;
      });
  }

}
