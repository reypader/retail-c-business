import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.css']
})
export class DateDialogComponent implements OnInit {

  date: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

}
