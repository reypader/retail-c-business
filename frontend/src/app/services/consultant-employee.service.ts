import {Injectable} from '@angular/core';
import {BackendService} from './backend.service';
import {ResultListingService} from './result-listing.service';
import {Consultant, ConsultantCompany} from '../types';

@Injectable()
export class ConsultantEmployeeService extends ResultListingService<Consultant> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'consultants';
  }

}
