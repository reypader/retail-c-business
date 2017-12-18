import {Component, Inject, OnInit} from '@angular/core';
import {Attendee} from '../../types';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-attendee-info',
  templateUrl: './attendee-info.component.html',
  styleUrls: ['./attendee-info.component.css']
})
export class AttendeeInfoComponent implements OnInit {

  attendee: Attendee;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.attendee = data.attendee;
  }

  ngOnInit() {
  }


}
