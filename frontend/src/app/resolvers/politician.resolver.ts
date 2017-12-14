import {Injectable} from '@angular/core';
import {PaginatedResult, Politician} from '../types';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {PoliticianService} from '../services/politician.service';

@Injectable()
export class PoliticianResolver implements Resolve<PaginatedResult<Politician>> {


  constructor(private politicians: PoliticianService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Politician>> {
    return this.politicians.getList().first();
  }
}
