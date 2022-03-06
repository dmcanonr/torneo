import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorService } from '../service/jugador.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  jugador: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private jugadorService: JugadorService
  ) { }

  ngOnInit(): void {
    let id = this.activatedroute.snapshot.paramMap.get("id");
    console.log('buscando jugador con id' + id);
    if(id) {
      this.jugadorService.buscarJugador(id).subscribe({
        next: (resp) => {
          console.log('jugador encontrado', resp);
          this.jugador = resp
        },
        error: (err) => {
          console.log("error buscando jugador", err);
          alert('ha ocurrido un error consultado el jugador');
        }
      });
    } else {
      alert('ha ocurrido un error consultado el jugador');
    }
  }

}
