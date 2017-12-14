import {Injectable} from '@angular/core';
import {Agenda, Attendee, Politician} from '../types';
import {ResultListingService} from './result-listing.service';
import {BackendService} from './backend.service';
import {formatDate} from '../utils';
import {AttendeeCreateDialogComponent} from '../agenda/attendee-create-dialog/attendee-create-dialog.component';

@Injectable()
export class AttendeeService extends ResultListingService<Attendee> {
  constructor(backend: BackendService) {
    super(backend);
  }

  getType(): string {
    return 'attendees';
  }

}
