import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PartidoService } from '../service/partido.service';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss']
})
export class PartidoComponent implements OnInit, AfterViewInit {
  partidos: Array<any>;

  constructor(
    private partidoService: PartidoService
  ) {
    this.partidos = new Array<any>();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('cargada la página');
    this.partidoService.listarPartidos().subscribe({
      next: (resp) => this.partidos = resp as Array<any>,
      error: (err) => {
        console.log("error buscando partidos", err);
        alert('ha ocurrido un error buscando el listado de partidos');
      }
    });
  }

  terminarPartido(id: string) {
    var opcion = confirm('esta seguro que quiere terminar el partido? si lo termina, ya no podrá editarlo');
    if (opcion == true) {

    }
  }

}
