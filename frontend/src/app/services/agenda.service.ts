import {Injectable} from '@angular/core';
import {ResultListingService} from './result-listing.service';
import {BackendService} from './backend.service';
import {Agenda} from '../types';

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
    o.date = d.getFullYear() + '-' + this._to2digit(d.getMonth() + 1) + '-' + this._to2digit(d.getDate());
    console.log(o['date']);
    return o;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

}
