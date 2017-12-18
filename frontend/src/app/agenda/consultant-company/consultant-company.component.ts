import {Component, Input, OnInit, Output} from '@angular/core';
import {ConsultantCompany} from '../../types';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-consultant-company',
  templateUrl: './consultant-company.component.html',
  styleUrls: ['./consultant-company.component.css']
})
export class ConsultantCompanyComponent implements OnInit {

  @Input() consultantCompany: ConsultantCompany;
  @Input() disabled = false;

  valid = false;

  nameControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  addressControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  postalCodeControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  emailControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required, Validators.email]});
  phoneControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  faxControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});
  notesControl = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});

  companyFormGroup = new FormGroup({
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
    if (!this.consultantCompany) {
      this.consultantCompany = {} as ConsultantCompany;
    }
    this.companyFormGroup.statusChanges.subscribe(data => this.valid = this.companyFormGroup.valid);
    if (this.disabled) {
      this.companyFormGroup.disable();
    }
  }

}
