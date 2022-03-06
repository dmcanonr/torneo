import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { FormComponent } from "./form/form.component";
import { JugadorComponent } from "./jugador/jugador.component";

const routes: Routes = [
  { path: '', component: JugadorComponent },
  { path: 'gestionar', component: FormComponent },
  { path: 'gestionar/:id', component: FormComponent },
  { path: 'detalles/:id', component: DetailsComponent }
];

export const JugadorRoutingModule = RouterModule.forChild(routes);