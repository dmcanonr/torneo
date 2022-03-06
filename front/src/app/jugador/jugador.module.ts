import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorComponent } from './jugador/jugador.component';
import { JugadorRoutingModule } from './jugador-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    JugadorComponent,
    DetailsComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JugadorRoutingModule
  ]
})
export class JugadorModule { }
