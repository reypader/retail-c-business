import {Injectable} from '@angular/core';
import {Attendee} from '../types';
import {ResultListingService} from './result-listing.service';
import {BackendService} from './backend.service';

@Injectable()
export class AttendeeService extends ResultListingService<Attendee> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'attendees';
  }

}
