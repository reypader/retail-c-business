import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridComponent} from './grid/grid.component';
import {ListingComponent} from './listing.component';
import {MatCardModule, MatButtonModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RegionListingComponent} from "./region-listing.component";
import {SubregionListingComponent} from "./subregion-listing.component";
import {CityListingComponent} from "./city-listing.component";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [],
  declarations: [GridComponent, RegionListingComponent, SubregionListingComponent, CityListingComponent]
})
export class ListingModule {
}
