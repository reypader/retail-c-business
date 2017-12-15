import {Component, Input, OnInit} from '@angular/core';
import {Consultant} from '../../types';

@Component({
  selector: 'app-consultant-employee',
  templateUrl: './consultant-employee.component.html',
  styleUrls: ['./consultant-employee.component.css']
})
export class ConsultantEmployeeComponent implements OnInit {
  @Input() consultant: Consultant;
  @Input() disabled = false;

  constructor() {
  }

  ngOnInit() {
    if (!this.consultant) {
      this.consultant = {} as Consultant;
    }
  }
}
