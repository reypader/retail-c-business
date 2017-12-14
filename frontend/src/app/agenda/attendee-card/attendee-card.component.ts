import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attendee} from '../../types';
import {AttendeeService} from '../../services/attendee.service';

@Component({
  selector: 'app-attendee-card',
  templateUrl: './attendee-card.component.html',
  styleUrls: ['./attendee-card.component.css']
})
export class AttendeeCardComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() attendeeUrl: URL;
  @Input() attendee: Attendee;

  @Output() removed = new EventEmitter<AttendeeLinks>();

  constructor(private attendees: AttendeeService) {
  }

  ngOnInit() {
    if (this.attendeeUrl) {
      if (this.attendee && this.attendee.url !== this.attendeeUrl) {
        throw new Error('[attendeeUrl] and [attendee] doesn\'t seem to point to the same thing');
      }
      this.attendees.getFor(this.attendeeUrl).subscribe(data => this.attendee = data);
    }
  }

  remove($event): void {
    this.removed.emit({attendeeUrl: this.attendeeUrl, politicianUrl: this.attendee.politician} as AttendeeLinks);
  }

}

export interface AttendeeLinks {
  attendeeUrl: URL;
  politicianUrl: URL;
}
