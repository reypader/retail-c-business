import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CityGridComponent, RegionGridComponent, SubregionGridComponent} from './grid/grid.component';
import {MatButtonModule, MatCardModule, MatProgressBarModule, MatTabsModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ListingComponent} from './listing.component';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  exports: [ListingComponent],
  declarations: [CityGridComponent, SubregionGridComponent, RegionGridComponent, ListingComponent]
})
export class ListingModule {
}
