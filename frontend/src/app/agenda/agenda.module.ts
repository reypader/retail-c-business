import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import {
  MatExpansionModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
  MatInputModule, MatIconModule, MatProgressSpinnerModule, MatSliderModule, MatRadioModule, MatCheckboxModule,
  MatButtonModule, MatProgressBarModule
} from "@angular/material";
import {AgendaComponent} from "./agenda.component";
import {AppRoutingModule} from "../app-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgcFloatButtonModule} from 'ngc-float-button';
import {FormsModule} from "@angular/forms";

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
    NgcFloatButtonModule,
    FormsModule,
    MatProgressBarModule
  ],
  exports: [AgendaComponent],
  declarations: [AgendaComponent, DetailComponent]
})
export class AgendaModule { }
