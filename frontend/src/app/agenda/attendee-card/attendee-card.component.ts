import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attendee} from '../../types';
import {AttendeeService} from '../../services/attendee.service';
import {MatDialog} from '@angular/material';
import {AttendeeInfoComponent} from '../attendee-info/attendee-info.component';

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

  constructor(private dialog: MatDialog, private attendees: AttendeeService) {
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

  open($event): void {
    const dialogRef = this.dialog.open(AttendeeInfoComponent,
      {
        data: {attendee: this.attendee}
      });
  }

}

export interface AttendeeLinks {
  attendeeUrl: URL;
  politicianUrl: URL;
}
