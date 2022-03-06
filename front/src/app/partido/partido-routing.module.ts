import { RouterModule, Routes } from "@angular/router";
import { AgregarCambioComponent } from "./agregar-cambio/agregar-cambio.component";
import { AgregarGolComponent } from "./agregar-gol/agregar-gol.component";
import { AgregarJugadorDestacadoComponent } from "./agregar-jugador-destacado/agregar-jugador-destacado.component";
import { AgregarTarjetaComponent } from "./agregar-tarjeta/agregar-tarjeta.component";
import { DetailsComponent } from "./details/details.component";
import { FormComponent } from "./form/form.component";
import { PartidoComponent } from "./partido/partido.component";

const routes: Routes = [
  { path: '', component: PartidoComponent },
  { path: 'gestionar', component: FormComponent },
  { path: 'gestionar/:id', component: FormComponent },
  { path: 'detalles/:id', component: DetailsComponent },
  { path: 'agregar-gol/:id', component: AgregarGolComponent },
  { path: 'agregar-tarjeta/:id', component: AgregarTarjetaComponent },
  { path: 'agregar-cambio/:id', component: AgregarCambioComponent },
  { path: 'agregar-jugador-destacado/:id', component: AgregarJugadorDestacadoComponent }
];

export const PartidoRoutingModule = RouterModule.forChild(routes);