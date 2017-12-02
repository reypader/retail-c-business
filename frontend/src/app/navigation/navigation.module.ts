import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user/user.component';
import {
  MatTabsModule, MatToolbarModule, MatMenuModule, MatIconModule,
  MatButtonModule
} from '@angular/material';
import {NavigationComponent} from "./navigation.component";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule
  ],
  exports: [NavigationComponent],
  declarations: [UserComponent, NavigationComponent]
})
export class NavigationModule {
}
