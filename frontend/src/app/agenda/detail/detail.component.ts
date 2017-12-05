import {Component, OnInit, Input} from '@angular/core';
import {AgendaService} from "../../services/agenda.service";
import {Agenda} from "../../types";
import 'rxjs/add/operator/delay';
@Component({
  selector: 'agenda-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() agendaUrl: URL;
  agenda: Agenda

  constructor(private agendas: AgendaService) {
  }

  ngOnInit() {
    this.agendas.getFor(this.agendaUrl).delay(10000).subscribe(data=>this.agenda=data);
  }

}
