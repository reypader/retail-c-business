import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavigationModule} from "./navigation/navigation.module";
import {SessionService} from "./services/session.service";
import {BackendService} from "./services/backend.service";
import {AppRoutingModule} from './app-routing.module';
import {ListingModule} from "./listing/listing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RegionService} from "./services/region.service";
import {SubregionService} from "./services/subregion.service";
import {CityService} from "./services/city.service";
import {AgendaModule} from "./agenda/agenda.module";
import {AgendaService} from "./services/agenda.service";
import {CityResolver} from "./resolvers/city.resolver";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavigationModule,
    ListingModule,
    AppRoutingModule,
    AgendaModule
  ],
  providers: [SessionService, BackendService, RegionService, SubregionService, CityService, AgendaService, CityResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
