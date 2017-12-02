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
  ],
  providers: [SessionService, BackendService, RegionService, SubregionService, CityService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
