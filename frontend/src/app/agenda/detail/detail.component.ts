import {Component, Input, OnInit} from '@angular/core';
import {AgendaService} from '../../services/agenda.service';
import {Agenda, ConsultantCompany} from '../../types';
import 'rxjs/add/operator/delay';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {ConsultantCompanyComponent} from '../consultant-company/consultant-company.component';
import {MatAutocompleteSelectedEvent, MatDialog} from '@angular/material';
import {ConsultantCompanyService} from '../../services/consultant-company.service';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() agendaUrl: URL;
  @Input() agenda: Agenda;
  @Input() open: boolean;
  @Input() companies: Array<ConsultantCompany>;
  filteredCompanies: Observable<Array<ConsultantCompany>>;
  consultantCompany: ConsultantCompany;
  voteTie = false;
  propVoteTie = false;

  detailControl: FormControl = new FormControl();

  constructor(private agendas: AgendaService, private dialog: MatDialog, private consultantCompanies: ConsultantCompanyService) {
  }

  ngOnInit() {
    if (this.agendaUrl) {
      if (this.agenda) {
        throw new Error('[agendaUrl] and [agenda] cannot both have values');
      }
      this.agendas.getFor(this.agendaUrl).subscribe(data => this.agenda = data);
    }
    this.filteredCompanies = this.detailControl.valueChanges
      .pipe(
        startWith({} as ConsultantCompany),
        map<any, string>(company => company && typeof company === 'object' ? company.name : company),
        map<string, ConsultantCompany[]>(val => val ? this.filter(val) : this.companies.slice())
      );
  }

  clearConsultantCompany($event): void {
    this.consultantCompany = null;
  }


  filter(val: string): ConsultantCompany[] {
    return this.companies.filter(company =>
      company.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  updateConsultantCompany($event: MatAutocompleteSelectedEvent): void {
    this.consultantCompany = $event.option.value as ConsultantCompany;
  }

  createConsultantCompanyDialog(): void {
    const dialogRef = this.dialog.open(ConsultantCompanyComponent);
    dialogRef.afterClosed().switchMap(result => {
      return this.consultantCompanies.save(result);
    }).switchMap(data => {
      this.consultantCompany = data;
      return this.consultantCompanies.getList();
    }).subscribe(data => this.companies = data.results);
  }

  adjustRepublicans($event): void {
    this.agenda.vote_percent_republican = 100 - this.agenda.vote_percent_democrat;
    this.recalculateVotes();
  }

  adjustDemocrats($event): void {
    this.agenda.vote_percent_democrat = 100 - this.agenda.vote_percent_republican;
    this.recalculateVotes();
  }

  recalculatePropVotes($val): void {
    if (this.agenda.vote_percent_prop_64 > 50) {
      this.agenda.prop_64_vote = true;
      this.propVoteTie = false;
    } else if (this.agenda.vote_percent_prop_64 === 50) {
      this.propVoteTie = true;
    } else {
      this.agenda.prop_64_vote = false;
      this.propVoteTie = false;
    }
  }

  private recalculateVotes(): void {
    if (this.agenda.vote_percent_republican > this.agenda.vote_percent_democrat) {
      this.agenda.dominant_political_stance = 'R';
      this.voteTie = false;
    } else if (this.agenda.vote_percent_republican === this.agenda.vote_percent_democrat) {
      this.voteTie = true;
    } else {
      this.agenda.dominant_political_stance = 'D';
      this.voteTie = false;
    }
  }

  displayCompany(c: ConsultantCompany): string {
    return c ? c.name : '';
  }

}
