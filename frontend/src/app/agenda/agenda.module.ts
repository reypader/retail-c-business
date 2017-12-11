import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComponent} from './detail/detail.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule
} from '@angular/material';
import {AgendaComponent} from './agenda.component';
import {AppRoutingModule} from '../app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateDialogComponent} from './date-dialog/date-dialog.component';
import {EditingSnackbarComponent} from './editing-snackbar/editing-snackbar.component';
import {ConsultantCompanyComponent} from './consultant-company/consultant-company.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  exports: [AgendaComponent],
  declarations: [
    AgendaComponent,
    DetailComponent,
    DateDialogComponent,
    EditingSnackbarComponent,
    ConsultantCompanyComponent
  ]
})
export class AgendaModule {
}
