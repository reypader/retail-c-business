import {BackendService} from './backend.service';
import {Observable} from 'rxjs';
import {PaginatedResult} from '../types';
import {HttpParams} from '@angular/common/http';
import {deepCopy} from '../utils';

export abstract class ResultListingService<T> {

  constructor(protected backend: BackendService) {
  }

  get(id: number): Observable<T> {
    console.log('Get details for ' + this.getType());
    return this.backend.getUrl(this.getType()).switchMap(url => this.backend.get<T>(url + id).map(data => this.enrich(data)));
  }

  getFor(url: URL): Observable<T> {
    if (url) {
      console.log('Get details for ' + this.getType());
      return this.backend.get<T>(url.toString()).map(data => this.enrich(data));
    } else {
      return Observable.of(null);
    }
  }

  getList(filter?: Object): Observable<PaginatedResult<T>> {
    console.log('Get listing for ' + this.getType());
    const q = this.getFilter(filter);
    return this.backend.getUrl(this.getType())
      .switchMap(url => this.backend.get<PaginatedResult<T>>(url, q)
        .map(data => this.enrichList(data)));
  }

  getListFor(url: URL, filter?: Object): Observable<PaginatedResult<T>> {
    if (url) {
      console.log('Get listing for ' + this.getType());
      const q = this.getFilter(filter);
      return this.backend.get<PaginatedResult<T>>(url.toString(), q).map(data => this.enrichList(data));
    } else {
      return Observable.of(null);
    }
  }

  getNext(current: PaginatedResult<T>): Observable<PaginatedResult<T>> {
    console.log('Get next for ' + this.getType());
    return this.backend.get<PaginatedResult<T>>(current.next).map(data => this.enrichList(data));
  }

  getPrevious(current: PaginatedResult<T>): Observable<PaginatedResult<T>> {
    console.log('Get previous for ' + this.getType());
    return this.backend.get<PaginatedResult<T>>(current.previous).map(data => this.enrichList(data));
  }

  save(t: T): Observable<T> {
    return this.backend.getUrl(this.getType())
      .switchMap(url => {
          const o = this.prepareSave(deepCopy(t) as T);
          return this.backend.post<T>(url, o);
        }
      )
      .map(data => {
        return this.enrich(data);
      });
  }

  partialUpdate(url: URL, t: T): Observable<T> {
    const o = this.prepareSave(deepCopy(t) as T);
    return this.backend.patch<T>(url.toString(), o).map(data => {
      return this.enrich(data);
    });
  }

  remove(url: URL): Observable<T> {
    return this.backend.delete(url.toString());
  }

  abstract getType(): string;

  enrich(o: T): T {
    return o;
  }

  enrichList(o: PaginatedResult<T>): PaginatedResult<T> {
    if (o.results) {
      const _this = this;
      o.results.forEach(function (part, index, r) {
        const x = r[index];
        r[index] = _this.enrich(x);
      });
    }
    return o;
  }

  protected prepareSave(t: T): T {
    return t;
  }

  private getFilter(filter: Object): HttpParams {
    console.log('Generating query params');
    let p = new HttpParams();
    for (const f in filter) {
      if (filter[f]) {
        p = p.set(f, filter[f]);
      }
    }
    return p;
  }


}
