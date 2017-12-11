import {Injectable} from '@angular/core';
import {City} from '../types';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CityService} from '../services/city.service';

@Injectable()
export class CityResolver implements Resolve<City> {


  constructor(private cities: CityService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<City> {
    return this.cities.get(+route.paramMap.get('id')).first();
  }
}
