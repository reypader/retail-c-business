import {Injectable} from '@angular/core';
import {ResultListingService} from './result-listing.service';
import {BackendService} from './backend.service';
import {Agenda} from '../types';
import {Observable} from 'rxjs';

@Injectable()
export class AgendaService extends ResultListingService<Agenda> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'agendas';
  }

  enrich(o: Agenda): Agenda {
    o.date = new Date(o.date);
    o.dateString = o.date.toDateString();
    return o;
  }

  save(agenda: Agenda): Observable<Agenda> {
    return this.backend.getUrl(this.getType())
      .switchMap(url => {
          const d = agenda.date;
          const o = this.deepCopy(agenda);
          o['date'] = d.getFullYear() + '-' + this._to2digit(d.getMonth() + 1) + '-' + this._to2digit(d.getDate());
          console.log(o['date']);

          return this.backend.post<Agenda>(url, o);
        }
      )
      .map(data => {
        data.new = false;
        return this.enrich(data);
      });
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

  private deepCopy(obj: Object): Object {
    var copy;

    if (null == obj || 'object' != typeof obj) return obj;

    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  }

}
