import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {ResultListingService} from "./result-listing.service";
import {Place, City} from "../types";
import {Observable, ReplaySubject} from "rxjs";

@Injectable()
export class CityService extends ResultListingService<City> {

  current: ReplaySubject<City>;

  getType(): string {
    return "cities";
  }

  enrich(o: City): City {
    o.subdivisions = o.url;
    return o;
  }

  constructor(backend: BackendService) {
    super(backend);
  }

  get(id: number): Observable<City> {
    if (this.current == null) {
      return this.fetch(super.get(id));
    } else {
      return this.current.switchMap(data=> {
        if (data && data.id == id) {
          return this.current;
        } else {
          return this.fetch(super.get(id));
        }
      })
    }
  }

  private fetch(o: Observable<City>): Observable<City> {
    this.current = new ReplaySubject<City>();
    o.subscribe(data => this.current.next(data));
    return this.current;
  }

  getFor(url: URL): Observable<City> {
    return this.fetch(super.getFor(url));
  }

}
