import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit, AfterViewInit {
  equipos: Array<any>;

  constructor(
    private equipoService: EquipoService
  ) {
    this.equipos = new Array<any>();
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    console.log('cargada la página');
    this.equipoService.listarEquipos().subscribe({
      next: (resp) => this.equipos = resp as Array<any>,
      error: (err) => {
        console.log("error buscando equipos", err);
        alert('ha ocurrido un error buscando el listado de equipos');
      }
    });
  }

  borrarEquipo(id: string): void {
    var opcion = confirm('esta seguro que quiere borrar el equipo?, se borrán también los jugadores del equipo y sus partidos?');
    if (opcion == true) {
      this.equipoService.borrarEquipo(id).subscribe({
        next: (resp) => {
          console.log('equipo borrado', resp);
          alert('equipo borrado correctamente');
        },
        error: (err) => {
          console.log("error buscando equipos", err);
          alert('ha ocurrido un error borrando el equipo');
        }
      });
    }
  }

}
