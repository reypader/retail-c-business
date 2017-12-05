import {Injectable} from '@angular/core';
import {AgendaListItem, PaginatedResult, City} from "../types";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {AgendaService} from "../services/agenda.service";
import {Observable} from "rxjs";
import {CityService} from "../services/city.service";

@Injectable()
export class CityResolver implements Resolve<City> {


  constructor(private cities: CityService) {
  }

  resolve(route: ActivatedRouteSnapshot) : Observable<City> {
    return this.cities.get(+route.paramMap.get('id')).first();
  }
}
