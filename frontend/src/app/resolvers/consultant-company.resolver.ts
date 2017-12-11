import {Injectable} from '@angular/core';
import {ConsultantCompany, PaginatedResult} from '../types';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ConsultantCompanyService} from '../services/consultant-company.service';

@Injectable()
export class ConsultantCompanyResolver implements Resolve<PaginatedResult<ConsultantCompany>> {


  constructor(private companies: ConsultantCompanyService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<ConsultantCompany>> {
    return this.companies.getList().first();
  }
}
