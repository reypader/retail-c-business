import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {formatDate} from '../../utils';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.css']
})
export class DateDialogComponent implements OnInit {
  maxDate = new Date();
  output: DateDialogOutput;
  lastDateString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.output = {
      date: new Date(),
      copyOfLatest: true
    } as DateDialogOutput;
    this.lastDateString = data.last ? formatDate(data.last) : null;
  }

  ngOnInit() {
  }

}

export interface DateDialogOutput {

  date: Date;
  copyOfLatest: boolean;
}
