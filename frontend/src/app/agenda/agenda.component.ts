import {Component, OnInit} from '@angular/core';
import {Agenda, City, ConsultantCompany, Region, SubRegion} from '../types';
import {ActivatedRoute} from '@angular/router';
import {SubregionService} from '../services/subregion.service';
import {RegionService} from '../services/region.service';
import {MatDialog, MatSnackBar, MatSnackBarRef} from '@angular/material';
import {DateDialogComponent} from './date-dialog/date-dialog.component';
import {EditingSnackbarComponent} from './editing-snackbar/editing-snackbar.component';
import {AgendaService} from '../services/agenda.service';
import {CityService} from '../services/city.service';
import {ConsultantCompanyComponent} from './consultant-company/consultant-company.component';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  city: City;
  subregion: SubRegion;
  region: Region;
  newAgenda: Agenda;
  snackBarRef: MatSnackBarRef<EditingSnackbarComponent>;
  consultantCompanies: Array<ConsultantCompany>;

  constructor(private route: ActivatedRoute,
              private cities: CityService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private regions: RegionService,
              private subregions: SubregionService,
              private agendas: AgendaService) {
  }


  ngOnInit() {
    this.city = this.route.snapshot.data['city'];
    this.consultantCompanies = this.route.snapshot.data['companies'].results;
    this.regions.getFor(this.city.region).subscribe(data => this.region = data);
    this.subregions.getFor(this.city.subregion).subscribe(data => this.subregion = data);
  }

  createAgendaDialog(scrollTarget): void {
    const dialogRef = this.dialog.open(DateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      const r = result as Date;
      this.newAgenda = {
        'new': true,
        city: this.city.url,
        date: r,
        dateString: r.toDateString(),
        vote_percent_democrat: 50,
        vote_percent_republican: 50,
        vote_percent_prop_64: 50
      } as Agenda;
      this.snackBarRef = this.snackbar.openFromComponent(EditingSnackbarComponent);
      scrollTarget.scrollIntoView();
    });
  }

  cancel($event): void {
    this.snackBarRef.dismiss();
    this.newAgenda = null;
  }

  save($event): void {
    this.agendas.save(this.newAgenda)
      .switchMap(data => this.cities.getFor(this.city.url))
      .subscribe(data => {
        this.city = data;
        this.newAgenda = null;
        this.snackBarRef.dismiss();
      });
  }

}
