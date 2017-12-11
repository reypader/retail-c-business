import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {ResultListingService} from './result-listing.service';
import {ConsultantCompany} from '../types';

@Injectable()
export class ConsultantCompanyService extends ResultListingService<ConsultantCompany> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'consultant_companies';
  }

}
