import {Component, OnInit, Input} from '@angular/core';
import {AgendaService} from '../../services/agenda.service';
import {Agenda} from '../../types';
import 'rxjs/add/operator/delay';
@Component({
  selector: 'agenda-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() agendaUrl: URL;
  @Input() agenda: Agenda
  @Input() open: boolean;
  voteTie: boolean = false;
  propVoteTie: boolean = false;

  constructor(private agendas: AgendaService) {
  }

  adjustRepublicans($event): void {
    this.agenda.vote_percent_republican = 100 - this.agenda.vote_percent_democrat;
    this.recalculateVotes();
  }

  adjustDemocrats($event): void {
    this.agenda.vote_percent_democrat = 100 - this.agenda.vote_percent_republican;
    this.recalculateVotes();
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

  ngOnInit() {
    if (this.agendaUrl) {
      if (this.agenda) {
        throw new Error('[agendaUrl] and [agenda] cannot both have values');
      }
      this.agendas.getFor(this.agendaUrl).subscribe(data=>this.agenda = data);
    }
  }

}
