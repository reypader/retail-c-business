import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListingComponent} from './listing/listing.component';
import {AgendaComponent} from './agenda/agenda.component';
import {CityResolver} from './resolvers/city.resolver';
import {ConsultantCompanyResolver} from './resolvers/consultant-company.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent
  },
  {
    path: 'cities/:id',
    component: AgendaComponent,
    resolve: {city: CityResolver, companies: ConsultantCompanyResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
