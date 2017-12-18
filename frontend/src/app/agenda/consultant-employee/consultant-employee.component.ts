import {Component, Input, OnInit} from '@angular/core';
import {Consultant} from '../../types';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-consultant-employee',
  templateUrl: './consultant-employee.component.html',
  styleUrls: ['./consultant-employee.component.css']
})
export class ConsultantEmployeeComponent implements OnInit {
  @Input() consultant: Consultant;
  @Input() disabled = false;

  valid = false;

  nameControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  addressControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  postalCodeControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  emailControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required, Validators.email]});
  phoneControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  faxControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  notesControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});

  employeeFormGroup = new FormGroup({
    nameControl: this.nameControl,
    addressControl: this.addressControl,
    postalCodeControl: this.postalCodeControl,
    emailControl: this.emailControl,
    phoneControl: this.phoneControl,
    faxControl: this.faxControl,
    notesControl: this.notesControl
  });

  constructor() {
  }

  ngOnInit() {
    if (!this.consultant) {
      this.consultant = {} as Consultant;
    }
    this.employeeFormGroup.statusChanges.subscribe(data => this.valid = this.employeeFormGroup.valid);
    if (this.disabled) {
      this.employeeFormGroup.disable();
    }
  }
}
