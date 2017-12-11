import {Component, Input, OnInit} from '@angular/core';
import {ConsultantCompany} from '../../types';

@Component({
  selector: 'app-consultant-company',
  templateUrl: './consultant-company.component.html',
  styleUrls: ['./consultant-company.component.css']
})
export class ConsultantCompanyComponent implements OnInit {

  @Input() consultantCompany: ConsultantCompany;
  @Input() disabled = false;

  constructor() {
  }

  ngOnInit() {
    if (!this.consultantCompany) {
      this.consultantCompany = {} as ConsultantCompany;
    }
  }

}
