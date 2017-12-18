import {Component, OnInit} from '@angular/core';
import {Agenda, Attendee, City, ConsultantCompany, Politician, Region, SubRegion} from '../types';
import {ActivatedRoute} from '@angular/router';
import {SubregionService} from '../services/subregion.service';
import {RegionService} from '../services/region.service';
import {MatDialog, MatSnackBar, MatSnackBarRef} from '@angular/material';
import {DateDialogComponent, DateDialogOutput} from './date-dialog/date-dialog.component';
import {EditingSnackbarComponent} from './editing-snackbar/editing-snackbar.component';
import {AgendaService} from '../services/agenda.service';
import {CityService} from '../services/city.service';
import {deepCopy} from '../utils';
import {AttendeeService} from '../services/attendee.service';
import {filter} from 'rxjs/operators/filter';

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
  latestAgenda: Agenda;
  snackBarRef: MatSnackBarRef<EditingSnackbarComponent>;
  consultantCompanies: Array<ConsultantCompany>;
  politicians: Array<Politician>;
  saveEnabled = false;

  constructor(private route: ActivatedRoute,
              private cityService: CityService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private regionService: RegionService,
              private subregionService: SubregionService,
              private agendaService: AgendaService,
              private attendeeService: AttendeeService) {
  }


  ngOnInit() {
    this.city = this.route.snapshot.data['city'];
    this.consultantCompanies = this.route.snapshot.data['companies'].results;
    this.politicians = this.route.snapshot.data['politicians'].results;
    this.regionService.getFor(this.city.region).subscribe(data => this.region = data);
    this.subregionService.getFor(this.city.subregion).subscribe(data => this.subregion = data);
  }

  trackLatest($event): void {
    const a = $event as Agenda;
    if (a.url === this.city.agendas[0]) {
      console.log('Latest agenda is now tracked: ' + a.url);
      this.latestAgenda = a;
    }
  }

  createAgendaDialog(scrollTarget): void {
    const dialogRef = this.dialog.open(DateDialogComponent,
      {
        data: {last: this.latestAgenda ? this.latestAgenda.date : null}
      });
    dialogRef.afterClosed().pipe(filter(result => result != null))
      .subscribe(result => {
        const r = result as DateDialogOutput;
        if (r.copyOfLatest && this.latestAgenda) {
          this.newAgenda = deepCopy(this.latestAgenda) as Agenda;
          this.newAgenda.new = true;
          this.newAgenda.date = r.date;
          this.newAgenda.dateString = r.date.toDateString();
          this.newAgenda.url = null;
          this.newAgenda.attendees = [];
          this.newAgenda.politicians = [];
        } else {
          this.newAgenda = {
            'new': true,
            date: r.date,
            dateString: r.date.toDateString(),
            vote_percent_democrat: 50,
            vote_percent_republican: 50,
            vote_percent_prop_64: 0,
            dominant_political_stance: 'R',
            politicians: [],
            attendees: []
          } as Agenda;
        }
        this.newAgenda.city = this.city.url;
        this.newAgenda.subregion = this.subregion.url;

        this.snackBarRef = this.snackbar.openFromComponent(EditingSnackbarComponent);
        scrollTarget.scrollIntoView();
      });
  }

  cancel($event): void {
    this.snackBarRef.dismiss();
    this.newAgenda = null;
  }

  save($event): void {
    if (this.saveEnabled) {
      this.agendaService.save(this.newAgenda)
        .do(data => {
          data.attendees.forEach((v, i) => this.attendeeService.partialUpdate(v, {agenda: data.url} as Attendee));
        })
        .switchMap(data => this.cityService.getFor(this.city.url))
        .subscribe(data => {
          this.city = data;
          this.newAgenda = null;
          this.snackBarRef.dismiss();
        });
    }
  }

  enableSave($event): void {
    this.saveEnabled = $event as boolean;
    console.log('Detail form changed validity: ' + this.saveEnabled);
  }

}
