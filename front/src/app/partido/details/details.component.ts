import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../service/partido.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  partido: any;
  marcador: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private partidoService: PartidoService
  ) {
    this.marcador = '';
  }

  ngOnInit(): void {
    let id = this.activatedroute.snapshot.paramMap.get("id");
    console.log('buscando partido con id' + id);
    if(id) {
      this.partidoService.buscarDetallesPartido(id).subscribe({
        next: (resp) => {
          console.log('partido encontrado', resp);
          this.partido = resp;
          this.obtenerMarcador();
        },
        error: (err) => {
          console.log("error buscando partido", err);
          alert('ha ocurrido un error consultado el partido');
        }
      });
    } else {
      alert('ha ocurrido un error consultado el partido');
    }
  }

  private obtenerMarcador() {
    let golesLocal = this.partido.goles.filter((golItem: any) => golItem.equipo._id == this.partido.equipoLocal._id).length;
    let golesVisitante = this.partido.goles.filter((golItem: any) => golItem.equipo._id == this.partido.equipoVisitante._id).length;
    console.log('goles de local', golesLocal);
    this.marcador = golesLocal + ' - ' + golesVisitante;
  }

}
