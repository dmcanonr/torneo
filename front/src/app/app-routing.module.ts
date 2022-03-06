import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
   path: '',
   loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
 },
 {
   path: 'dashboard',
   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
 },
 {
   path: 'equipos',
   loadChildren: () => import('./equipo/equipo.module').then(m => m.EquipoModule)
 },
 {
   path: 'jugadores',
   loadChildren: () => import('./jugador/jugador.module').then(m => m.JugadorModule)
 },
 {
   path: 'partidos',
   loadChildren: () => import('./partido/partido.module').then(m => m.PartidoModule)
 },
 {
   path: 'narradores',
   loadChildren: () => import('./narrador/narrador.module').then(m => m.NarradorModule)
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
