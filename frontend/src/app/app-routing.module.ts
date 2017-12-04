import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListingComponent} from "./listing/listing.component";

const routes: Routes = [
  {path: 'home', component: ListingComponent},
  {
    path: '',
    redirectTo: '/home',
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
