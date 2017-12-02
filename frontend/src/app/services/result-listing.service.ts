import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {PaginatedResult} from "../types";
import {HttpParams} from "@angular/common/http";

export abstract class ResultListingService<T> {

  constructor(private backend: BackendService) {
  }

  get(id: string): Observable<T> {
    console.log("Get details for " + this.getType());
    return this.backend.getUrl(this.getType()).switchMap(url => this.backend.get<T>(url + id));
  }

  getList(filter?: Object): Observable<PaginatedResult<T>> {
    console.log("Get listing for " + this.getType());
    let q = this.getFilter(filter);
    return this.backend.getUrl(this.getType()).switchMap(url => this.backend.get<PaginatedResult<T>>(url, q));
  }

  getNext(current: PaginatedResult<T>): Observable<PaginatedResult<T>> {
    console.log("Get next for " + this.getType());
    return this.backend.get<PaginatedResult<T>>(current.next);
  }

  getPrevious(current: PaginatedResult<T>): Observable<PaginatedResult<T>> {
    console.log("Get previous for " + this.getType());
    return this.backend.get<PaginatedResult<T>>(current.previous);
  }

  abstract getType(): string;

  private getFilter(filter: Object): HttpParams {
    console.log("Generating query params");
    const p = new HttpParams();
    for (let f in filter) {
      p.set(f, filter[f]);
    }
    return p;
  }

}
