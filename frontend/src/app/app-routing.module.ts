import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegionListingComponent} from "./listing/region-listing.component";
import {CityListingComponent} from "./listing/city-listing.component";
import {SubregionListingComponent} from "./listing/subregion-listing.component";

const routes: Routes = [
  {path: 'browse/regions', component: RegionListingComponent},
  {path: 'browse/subregions', component: SubregionListingComponent},
  {path: 'browse/cities', component: CityListingComponent},
  {
    path: '',
    redirectTo: 'browse/regions',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
