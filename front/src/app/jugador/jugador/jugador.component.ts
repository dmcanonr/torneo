import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JugadorService } from '../service/jugador.service';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.scss']
})
export class JugadorComponent implements OnInit, AfterViewInit {
  jugadores: Array<any>;

  constructor(
    private jugadorService: JugadorService
  ) {
    this.jugadores = new Array<any>();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('cargada la página');
    this.jugadorService.listarJugadores().subscribe({
      next: (resp) => this.jugadores = resp as Array<any>,
      error: (err) => {
        console.log("error buscando jugadores", err);
        alert('ha ocurrido un error buscando el listado de jugadores');
      }
    });
  }

  borrarJugador(id: string): void {
    var opcion = confirm('esta seguro que quiere borrar el jugador?, se borrarán también los goles, estadìsticas y tarjetas que tenga registradas');
    if (opcion == true) {
      this.jugadorService.borrarJugador(id).subscribe({
        next: (resp) => {
          console.log('jugador borrado', resp);
          alert('jugador borrado correctamente');
        },
        error: (err) => {
          console.log("error buscando equipos", err);
          alert('ha ocurrido un error borrando el jugador');
        }
      });
    }
  }

}
