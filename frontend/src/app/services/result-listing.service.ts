import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {PaginatedResult} from "../types";
import {HttpParams} from "@angular/common/http";

export abstract class ResultListingService<T> {

  constructor(private backend: BackendService) {
  }

  get(id: number): Observable<T> {
    console.log("Get details for " + this.getType());
    return this.backend.getUrl(this.getType()).switchMap(url => this.backend.get<T>(url + id).map(data => this.enrich(data)));
  }

  getFor(url: URL): Observable<T> {
    console.log("Get details for " + this.getType());
    return this.backend.get<T>(url.toString()).map(data => this.enrich(data));
  }

  getList(filter?: Object): Observable<PaginatedResult<T>> {
    console.log("Get listing for " + this.getType());
    let q = this.getFilter(filter);
    return this.backend.getUrl(this.getType()).switchMap(url => this.backend.get<PaginatedResult<T>>(url, q).map(data => this.enrichList(data)));
  }

  getListFor(url: URL, filter?: Object): Observable<PaginatedResult<T>> {
    console.log("Get listing for " + this.getType());
    let q = this.getFilter(filter);
    return this.backend.get<PaginatedResult<T>>(url.toString(), q).map(data => this.enrichList(data));
  }

  getNext(current: PaginatedResult<T>): Observable<PaginatedResult<T>> {
    console.log("Get next for " + this.getType());
    return this.backend.get<PaginatedResult<T>>(current.next).map(data => this.enrichList(data));
  }

  getPrevious(current: PaginatedResult<T>): Observable<PaginatedResult<T>> {
    console.log("Get previous for " + this.getType());
    return this.backend.get<PaginatedResult<T>>(current.previous).map(data => this.enrichList(data));
  }

  abstract getType(): string;

  private getFilter(filter: Object): HttpParams {
    console.log("Generating query params");
    let p = new HttpParams();
    for (let f in filter) {
      if (filter[f]) {
        p = p.set(f, filter[f]);
      }
    }
    return p;
  }

  enrich(o: T): T {
    return o;
  }

  enrichList(o: PaginatedResult<T>): PaginatedResult<T> {
    if (o.results) {
      let _this = this;
      o.results.forEach(function (part, index, r) {
        let x = r[index];
        r[index] = _this.enrich(x);
      });
    }
    return o;
  }


}
