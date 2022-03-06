import { RouterModule, Routes } from "@angular/router";
import { ListarNarradorComponent } from "./listar-narrador/listar-narrador.component";
import { FormComponent } from "./form/form.component"; 

const routes: Routes = [
  { path: '', component: ListarNarradorComponent },
  { path: 'gestionar', component: FormComponent },
  { path: 'gestionar/:id', component: FormComponent }
];

export const NarradorRoutingModule = RouterModule.forChild(routes);