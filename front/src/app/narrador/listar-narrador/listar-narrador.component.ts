import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NarradorService } from '../service/narrador.service';

@Component({
  selector: 'app-listar-narrador',
  templateUrl: './listar-narrador.component.html',
  styleUrls: ['./listar-narrador.component.scss']
})
export class ListarNarradorComponent implements OnInit, AfterViewInit {
  narradores: Array<any>;

  constructor(
    private narradorService: NarradorService
  ) {
    this.narradores = new Array<any>();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('cargada la página');
    this.narradorService.listarNarradores().subscribe({
      next: (resp) => this.narradores = resp as Array<any>,
      error: (err) => {
        console.log("Error buscando narrador", err);
        alert('Ha ocurrido un error buscando el listado de narradores');
      }
    });
  }

}
