import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarNarradorComponent } from './listar-narrador/listar-narrador.component';
import { NarradorRoutingModule } from './narrador-routing.module';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    ListarNarradorComponent,
    FormComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NarradorRoutingModule
  ]
})
export class NarradorModule { }
