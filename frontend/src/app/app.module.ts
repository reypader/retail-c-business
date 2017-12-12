import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavigationModule} from './navigation/navigation.module';
import {SessionService} from './services/session.service';
import {BackendService} from './services/backend.service';
import {AppRoutingModule} from './app-routing.module';
import {ListingModule} from './listing/listing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegionService} from './services/region.service';
import {SubregionService} from './services/subregion.service';
import {CityService} from './services/city.service';
import {AgendaModule} from './agenda/agenda.module';
import {AgendaService} from './services/agenda.service';
import {CityResolver} from './resolvers/city.resolver';
import {DateDialogComponent} from './agenda/date-dialog/date-dialog.component';
import {EditingSnackbarComponent} from './agenda/editing-snackbar/editing-snackbar.component';
import {ConsultantCompanyService} from './services/consultant-company.service';
import {ConsultantCompanyResolver} from './resolvers/consultant-company.resolver';
import {ConsultantCompanyComponent} from './agenda/consultant-company/consultant-company.component';
import {ConsultantEmployeeService} from './services/consultant-employee.service';
import {ConsultantEmployeeComponent} from './agenda/consultant-employee/consultant-employee.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    NavigationModule,
    ListingModule,
    AppRoutingModule,
    AgendaModule
  ],
  entryComponents: [DateDialogComponent, EditingSnackbarComponent, ConsultantCompanyComponent, ConsultantEmployeeComponent],
  providers: [SessionService, BackendService, RegionService, SubregionService, CityService, AgendaService, CityResolver, ConsultantCompanyService, ConsultantEmployeeService, ConsultantCompanyResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
