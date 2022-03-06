import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  equipo: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private equipoService: EquipoService
  ) { }

  ngOnInit(): void {
    let id = this.activatedroute.snapshot.paramMap.get("id");
    console.log('buscando equipo con id' + id);
    if(id) {
      this.equipoService.buscarEquipo(id).subscribe({
        next: (resp) => {
          console.log('equipo encontrado', resp);
          this.equipo = resp
        },
        error: (err) => {
          console.log("error buscando equipo", err);
          alert('ha ocurrido un error consultado el equipo');
        }
      });
    } else {
      alert('ha ocurrido un error consultado el equipo');
    }
  }

}
