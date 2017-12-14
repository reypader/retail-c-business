import {Component, Inject, OnInit} from '@angular/core';
import {Attendee} from '../../types';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-attendee-create-dialog',
  templateUrl: './attendee-create-dialog.component.html',
  styleUrls: ['./attendee-create-dialog.component.css']
})
export class AttendeeCreateDialogComponent implements OnInit {

  maxDate: Date;
  attendee: Attendee = {} as Attendee;
  exists = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    if (data && data.politician) {
      this.attendee.name = data.politician.name;
      this.attendee.district = data.politician.district;
      this.attendee.image_path = data.politician.image_path;
      this.exists = true;
    } else {
      this.attendee.image_path = 'assets/blank_male_avatar.jpg';
    }
  }

  ngOnInit() {
  }

}
