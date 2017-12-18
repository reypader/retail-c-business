import {Component, Inject, OnInit} from '@angular/core';
import {Attendee} from '../../types';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-attendee-create-dialog',
  templateUrl: './attendee-create-dialog.component.html',
  styleUrls: ['./attendee-create-dialog.component.css']
})
export class AttendeeCreateDialogComponent implements OnInit {

  maxDate: Date;
  attendee: Attendee = {} as Attendee;
  exists = false;

  valid = false;

  nameControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  districtControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  imageControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});

  titleControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  groupControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  departmentControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});

  personalFormGroup = new FormGroup({
    nameControl: this.nameControl,
    districtControl: this.districtControl,
    imageControl: this.imageControl
  });

  attendeeFormGroup = new FormGroup({
    titleControl: this.titleControl,
    groupControl: this.groupControl,
    departmentControl: this.departmentControl
  });

  notesControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});

  createFormArray = new FormArray([this.personalFormGroup, this.attendeeFormGroup, this.notesControl]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    if (data && data.politician) {
      this.attendee.name = data.politician.name;
      this.attendee.district = data.politician.district;
      this.attendee.image_path = data.politician.image_path;
      this.attendee.political_stance = 'D';
      this.exists = true;
      this.personalFormGroup.disable();
    } else {
      this.attendee.image_path = 'assets/blank_male_avatar.jpg';
    }
  }

  ngOnInit() {
    this.createFormArray.statusChanges.subscribe(data => this.valid = this.createFormArray.valid);
  }

}
