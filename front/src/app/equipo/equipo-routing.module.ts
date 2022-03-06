import { RouterModule, Routes } from "@angular/router";
import { DetailsComponent } from "./details/details.component";
import { EquipoComponent } from "./equipo/equipo.component";
import { FormComponent } from "./form/form.component";

const routes: Routes = [
  { path: '', component: EquipoComponent },
  { path: 'gestionar', component: FormComponent },
  { path: 'gestionar/:id', component: FormComponent },
  { path: 'detalles/:id', component: DetailsComponent }
];

export const EquipoRoutingModule = RouterModule.forChild(routes);