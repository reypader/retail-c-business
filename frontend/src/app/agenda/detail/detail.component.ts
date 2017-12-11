import {Component, Input, OnInit} from '@angular/core';
import {AgendaService} from '../../services/agenda.service';
import {Agenda, ConsultantCompany} from '../../types';
import 'rxjs/add/operator/delay';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';

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
  voteTie = false;
  propVoteTie = false;

  detailControl: FormControl = new FormControl();

  constructor(private agendas: AgendaService) {
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
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): ConsultantCompany[] {
    console.log(this.companies);
    return this.companies.filter(company =>
      company.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
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

}
