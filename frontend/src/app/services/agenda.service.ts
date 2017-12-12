import {Injectable} from '@angular/core';
import {ResultListingService} from './result-listing.service';
import {BackendService} from './backend.service';
import {Agenda} from '../types';
import {formatDate} from '../utils';

@Injectable()
export class AgendaService extends ResultListingService<Agenda> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'agendas';
  }

  enrich(o: Agenda): Agenda {
    o.new = false;
    o.date = new Date(o.date);
    o.dateString = o.date.toDateString();
    return o;
  }

  prepareSave(o: Agenda): Agenda {
    const d = o.date;
    o.date = formatDate(d);
    console.log(o['date']);
    return o;
  }
}
