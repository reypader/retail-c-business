import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgendaService} from '../../services/agenda.service';
import {Agenda, Consultant, ConsultantCompany} from '../../types';
import 'rxjs/add/operator/delay';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';
import {ConsultantCompanyComponent} from '../consultant-company/consultant-company.component';
import {MatAutocompleteSelectedEvent, MatDialog} from '@angular/material';
import {ConsultantCompanyService} from '../../services/consultant-company.service';
import {ConsultantEmployeeComponent} from '../consultant-employee/consultant-employee.component';
import {ConsultantEmployeeService} from '../../services/consultant-employee.service';


@Component({
  selector: 'app-agenda-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() agendaUrl: URL;
  @Input() agenda: Agenda;
  @Input() open: boolean;
  @Input() companies: Array<ConsultantCompany>;
  @Output() agendaLoaded = new EventEmitter<Agenda>();

  employees: Array<Consultant> = [];
  filteredCompanies: Observable<Array<ConsultantCompany>>;
  filteredEmployees: Observable<Array<Consultant>>;
  consultantCompany: ConsultantCompany;
  consultant: Consultant;
  voteTie = false;
  propVoteTie = false;

  detailControl: FormControl = new FormControl();
  employeeControl: FormControl = new FormControl();

  constructor(private agendas: AgendaService, private dialog: MatDialog, private consultantCompanies: ConsultantCompanyService, private consultants: ConsultantEmployeeService) {
  }

  ngOnInit() {
    if (this.agendaUrl) {
      if (this.agenda) {
        throw new Error('[agendaUrl] and [agenda] cannot both have values');
      }
      this.agendas.getFor(this.agendaUrl).switchMap(data => {
        this.agenda = data;
        this.agendaLoaded.emit(this.agenda);
        return Observable.forkJoin(
          this.consultantCompanies.getFor(data.cannabis_consultant_company),
          this.consultants.getFor(data.cannabis_consultant_employee)
        );
      }).subscribe(data => {
        this.consultantCompany = data[0];
        this.consultant = data[1];
      });
    }
    this.filteredCompanies = this.detailControl.valueChanges
      .pipe(
        startWith({} as ConsultantCompany),
        map<any, string>(company => company && typeof company === 'object' ? company.name : company),
        map<string, ConsultantCompany[]>(val => val ? this.filterCompanies(val) : this.companies.slice())
      );

    this.filteredEmployees = this.employeeControl.valueChanges
      .pipe(
        startWith({} as Consultant),
        map<any, string>(employee => employee && typeof employee === 'object' ? employee.name : employee),
        map<string, Consultant[]>(val => val ? this.filterEmployees(val) : this.employees.slice())
      );
  }

  clearConsultantCompany($event): void {
    this.consultantCompany = null;
    this.agenda.cannabis_consultant_company = null;
    this.employees = [];
    this.clearConsultant($event);
  }

  clearConsultant($event): void {
    this.consultant = null;
    this.agenda.cannabis_consultant_employee = null;
  }


  filterCompanies(val: string): ConsultantCompany[] {
    return this.companies.filter(company =>
      company.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  filterEmployees(val: string): Consultant[] {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  updateConsultantCompany($event: MatAutocompleteSelectedEvent): void {
    this.consultantCompany = $event.option.value as ConsultantCompany;
    this.agenda.cannabis_consultant_company = this.consultantCompany.url;
    this.consultants.getList({company__id: this.consultantCompany.id}).subscribe(data => {
      this.employees = data.results;
      this.employeeControl.setValue('');
    });
  }

  updateConsultant($event: MatAutocompleteSelectedEvent): void {
    this.consultant = $event.option.value as Consultant;
    this.agenda.cannabis_consultant_employee = this.consultant.url;
  }

  createConsultantCompanyDialog(): void {
    const dialogRef = this.dialog.open(ConsultantCompanyComponent);
    dialogRef.afterClosed().switchMap(result => {
      return this.consultantCompanies.save(result);
    }).switchMap(data => {
      this.consultantCompany = data;
      this.agenda.cannabis_consultant_company = this.consultantCompany.url;
      this.consultants.getList({company__id: this.consultantCompany.id}).subscribe(r => {
        this.employees = r.results;
        this.employeeControl.setValue('');
      });
      return this.consultantCompanies.getList();
    }).subscribe(data => this.companies = data.results);
  }

  createConsultantDialog(): void {
    const dialogRef = this.dialog.open(ConsultantEmployeeComponent);
    dialogRef.afterClosed().switchMap(result => {
      result.company = this.consultantCompany.url;
      return this.consultants.save(result);
    }).switchMap(data => {
      this.consultant = data;
      this.agenda.cannabis_consultant_employee = this.consultant.url;
      return this.consultants.getList({company__id: this.consultantCompany.id});
    }).subscribe(data => this.employees = data.results);
  }

  adjustRepublicans($event): void {
    this.agenda.vote_percent_republican = 100 - this.agenda.vote_percent_democrat;
    this.recalculateVotes();
  }

  adjustDemocrats($event): void {
    this.agenda.vote_percent_democrat = 100 - this.agenda.vote_percent_republican;
    this.recalculateVotes();
  }

  recalculatePropVotes($val): void {
    if (this.agenda.vote_percent_prop_64 > 50) {
      this.agenda.prop_64_vote = true;
      this.propVoteTie = false;
    } else if (this.agenda.vote_percent_prop_64 === 50) {
      this.propVoteTie = true;
    } else {
      this.agenda.prop_64_vote = false;
      this.propVoteTie = false;
    }
  }

  private recalculateVotes(): void {
    if (this.agenda.vote_percent_republican > this.agenda.vote_percent_democrat) {
      this.agenda.dominant_political_stance = 'R';
      this.voteTie = false;
    } else if (this.agenda.vote_percent_republican === this.agenda.vote_percent_democrat) {
      this.voteTie = true;
    } else {
      this.agenda.dominant_political_stance = 'D';
      this.voteTie = false;
    }
  }

  display(c: ConsultantCompany | Consultant): string {
    return c ? c.name : '';
  }

}
