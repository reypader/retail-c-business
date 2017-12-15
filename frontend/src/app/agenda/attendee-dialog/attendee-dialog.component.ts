import {Component, Input, OnInit} from '@angular/core';
import {Politician} from '../../types';

@Component({
  selector: 'app-attendee-dialog',
  templateUrl: './attendee-dialog.component.html',
  styleUrls: ['./attendee-dialog.component.css']
})
export class AttendeeDialogComponent implements OnInit {

  @Input() attendee: Politician;

  constructor() {
  }

  ngOnInit() {

  }

}
