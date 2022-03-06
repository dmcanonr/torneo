import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidoComponent } from './partido/partido.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartidoRoutingModule } from './partido-routing.module';
import { AgregarGolComponent } from './agregar-gol/agregar-gol.component';
import { AgregarTarjetaComponent } from './agregar-tarjeta/agregar-tarjeta.component';
import { AgregarJugadorDestacadoComponent } from './agregar-jugador-destacado/agregar-jugador-destacado.component';
import { AgregarCambioComponent } from './agregar-cambio/agregar-cambio.component';



@NgModule({
  declarations: [
    PartidoComponent,
    DetailsComponent,
    FormComponent,
    AgregarGolComponent,
    AgregarTarjetaComponent,
    AgregarJugadorDestacadoComponent,
    AgregarCambioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PartidoRoutingModule
  ]
})
export class PartidoModule { }
