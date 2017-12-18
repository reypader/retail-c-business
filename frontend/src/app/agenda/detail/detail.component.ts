import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgendaService} from '../../services/agenda.service';
import {Agenda, Consultant, ConsultantCompany, Politician} from '../../types';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {filter} from 'rxjs/operators/filter';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';
import {ConsultantCompanyComponent} from '../consultant-company/consultant-company.component';
import {MatAutocompleteSelectedEvent, MatDialog} from '@angular/material';
import {ConsultantCompanyService} from '../../services/consultant-company.service';
import {ConsultantEmployeeComponent} from '../consultant-employee/consultant-employee.component';
import {ConsultantEmployeeService} from '../../services/consultant-employee.service';
import {AttendeeCreateDialogComponent} from '../attendee-create-dialog/attendee-create-dialog.component';
import {PoliticianService} from '../../services/politician.service';
import {AttendeeService} from '../../services/attendee.service';
import {AttendeeLinks} from '../attendee-card/attendee-card.component';


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
  @Input() officials: Array<Politician>;
  @Output() agendaLoaded = new EventEmitter<Agenda>();
  @Output() validityChange = new EventEmitter<boolean>();

  employees: Array<Consultant> = [];
  filteredCompanies: Observable<Array<ConsultantCompany>>;
  filteredEmployees: Observable<Array<Consultant>>;
  filteredPoliticians: Observable<Array<Politician>>;
  consultantCompany: ConsultantCompany;
  consultant: Consultant;
  voteTie = false;
  propVoteTie = false;

  companyControl = new FormControl();
  employeeControl = new FormControl();
  politicianControl = new FormControl();

  landArea = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.min(0), Validators.pattern(new RegExp('^[0-9]+(\.[0-9]+)?$'))]
  });
  population = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.min(0), Validators.pattern(new RegExp('^[0-9]+$'))]
  });
  financialIncome = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.min(0), Validators.pattern(new RegExp('^[0-9]+(\.[0-9]+)?$'))]
  });
  financialIncomePerCapita = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.min(0), Validators.pattern(new RegExp('^[0-9]+(\.[0-9]+)?$'))]
  });
  businessTax = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.min(0), Validators.pattern(new RegExp('^[0-9]+(\.[0-9]+)?$'))]
  });
  cannabisTax = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.min(0), Validators.pattern(new RegExp('^[0-9]+(\.[0-9]+)?$'))]
  });
  videoLink = new FormControl('', {
    updateOn: 'blur',
    validators: [Validators.required, Validators.pattern(new RegExp('(http[s]?|ftp):\\/\\/.+\\..*'))]
  });
  notes = new FormControl('', {updateOn: 'blur', validators: [Validators.required]});

  detailFormGroup = new FormGroup({
    landArea: this.landArea,
    population: this.population,
    financialIncome: this.financialIncome,
    financialIncomePerCapita: this.financialIncomePerCapita,
    businessTax: this.businessTax,
    cannabisTax: this.cannabisTax,
    videoLink: this.videoLink,
    notes: this.notes
  });


  constructor(private agendaService: AgendaService,
              private dialog: MatDialog,
              private consultantCompanyService: ConsultantCompanyService,
              private consultantService: ConsultantEmployeeService,
              private politicianService: PoliticianService,
              private attendeeService: AttendeeService) {
  }

  ngOnInit() {
    if (this.agendaUrl) {
      if (this.agenda) {
        throw new Error('[agendaUrl] and [agenda] cannot both have values');
      }
      this.agendaService.getFor(this.agendaUrl).switchMap(data => {
        this.agenda = data;
        this.disableFields();
        this.agendaLoaded.emit(this.agenda);
        return Observable.forkJoin(
          this.consultantCompanyService.getFor(data.cannabis_consultant_company),
          this.consultantService.getFor(data.cannabis_consultant_employee)
        );
      }).subscribe(data => {
        this.consultantCompany = data[0];
        this.consultant = data[1];
      });
    }
    if (this.agenda) {
      this.disableFields();
    }
    this.filteredCompanies = this.companyControl.valueChanges
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

    this.filteredPoliticians = this.politicianControl.valueChanges
      .pipe(
        startWith({} as Politician),
        map<any, string>(politician => politician && typeof politician === 'object' ? politician.name : politician),
        map<string, Politician[]>(val => val ? this.filterPoliticians(val) : this.filterPoliticians(''))
      );
    this.detailFormGroup.statusChanges.subscribe(data => this.validityChange.emit(this.detailFormGroup.valid));
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

  filterPoliticians(val: string): Politician[] {
    return this.officials.filter(member => (this.agenda.politicians.indexOf(member.url) < 0) &&
      (member.name.toLowerCase().indexOf(val.toLowerCase()) > -1));
  }

  updateConsultantCompany($event: MatAutocompleteSelectedEvent): void {
    this.consultantCompany = $event.option.value as ConsultantCompany;
    if (this.consultantCompany) {
      this.agenda.cannabis_consultant_company = this.consultantCompany.url;
      this.consultantService.getList({company__id: this.consultantCompany.id}).subscribe(data => {
        this.employees = data.results;
        this.employeeControl.setValue('');
      });
    }
  }

  updateConsultant($event: MatAutocompleteSelectedEvent): void {
    this.consultant = $event.option.value as Consultant;
    if (this.consultant) {
      this.agenda.cannabis_consultant_employee = this.consultant.url;
    }
  }

  updatePolitician($event: MatAutocompleteSelectedEvent): void {
    const politician = $event.option.value as Politician;
    if (politician) {
      const dialogRef = this.dialog.open(AttendeeCreateDialogComponent, {
        data: {politician: politician}
      });
      dialogRef.afterClosed()
        .pipe(filter(result => result != null))
        .switchMap(result => {
          result.politician = politician.url;
          this.agenda.politicians.push(politician.url);
          if (!result.image_path) {
            result.image_path = '/static/assets/blank_male_avatar.jpg';
          }
          return this.attendeeService.save(result)
            .do(r => this.politicianService.partialUpdate(politician.url, {image_path: result.image_path} as Politician)
              .subscribe(data => console.log('updated image_path for attendee')));
        })
        .subscribe(data => this.agenda.attendees.push(data.url));
      this.politicianControl.setValue('');
    }
  }

  createConsultantCompanyDialog(): void {
    const dialogRef = this.dialog.open(ConsultantCompanyComponent);
    dialogRef.afterClosed().pipe(filter(result => result != null)).switchMap(result => this.consultantCompanyService.save(result))
      .switchMap(data => {
        this.consultantCompany = data;
        this.agenda.cannabis_consultant_company = this.consultantCompany.url;
        this.consultantService.getList({company__id: this.consultantCompany.id}).subscribe(r => {
          this.employees = r.results;
          this.employeeControl.setValue('');
        });
        return this.consultantCompanyService.getList();
      }).subscribe(data => this.companies = data.results);
  }

  createConsultantDialog(): void {
    const dialogRef = this.dialog.open(ConsultantEmployeeComponent);
    dialogRef.afterClosed().pipe(filter(result => result != null)).switchMap(result => {
      result.company = this.consultantCompany.url;
      return this.consultantService.save(result);
    }).switchMap(data => {
      this.consultant = data;
      this.agenda.cannabis_consultant_employee = this.consultant.url;
      return this.consultantService.getList({company__id: this.consultantCompany.id});
    }).subscribe(data => this.employees = data.results);
  }

  createAttendeeDialog(): void {
    const dialogRef = this.dialog.open(AttendeeCreateDialogComponent);
    dialogRef.afterClosed()
      .pipe(filter(result => result != null))
      .switchMap(result => {
        result.subregion = this.agenda.subregion;
        result.city = this.agenda.city;
        if (!result.image_path) {
          result.image_path = '/static/assets/blank_male_avatar.jpg';
        }
        return this.politicianService.save(result)
          .do(politician => {
            result.politician = politician.url;
            this.attendeeService.save(result)
              .subscribe(data => this.agenda.attendees.push(data.url));
          }).do(politician => this.politicianService.getList()
            .subscribe(data => this.officials = data.results));
      })
      .subscribe(data => this.agenda.politicians.push(data.url));
  }

  adjustRepublicans($event): void {
    this.agenda.vote_percent_republican = 100 - this.agenda.vote_percent_democrat;
    this.recalculateVotes();
  }

  adjustDemocrats($event): void {
    this.agenda.vote_percent_democrat = 100 - this.agenda.vote_percent_republican;
    this.recalculateVotes();
  }

  removeAttendee($event): void {
    const links = $event as AttendeeLinks;
    this.attendeeService.remove(links.attendeeUrl).subscribe(data => console.log('Deleted ' + links.attendeeUrl));
    this.agenda.attendees = this.agenda.attendees.filter(u => u !== links.attendeeUrl);
    this.agenda.politicians = this.agenda.politicians.filter(u => u !== links.politicianUrl);
    this.politicianControl.setValue('');
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

  display(c: ConsultantCompany | Consultant): string {
    return c ? c.name : '';
  }

  private disableFields(): void {
    if (!this.agenda.new) {
      this.detailFormGroup.disable();
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

}
