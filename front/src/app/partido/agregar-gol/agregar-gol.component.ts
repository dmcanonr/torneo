import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from '../service/partido.service';

@Component({
  selector: 'app-agregar-gol',
  templateUrl: './agregar-gol.component.html',
  styleUrls: ['./agregar-gol.component.scss']
})
export class AgregarGolComponent implements OnInit {
  partido: any;
  formGol: FormGroup;
  idPartido: string | null;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private partidoService: PartidoService,
    formBuilder: FormBuilder,
  ) {
    this.idPartido = '';
    this.formGol = formBuilder.group({
      equipo: [null, [Validators.required]],
      jugador: [null, [Validators.required]],
      minuto: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.idPartido = this.activatedroute.snapshot.paramMap.get("id");
    console.log('buscando partido con id' + this.idPartido);
    if (this.idPartido) {
      this.partidoService.buscarEquiposGol(this.idPartido).subscribe({
        next: (resp) => {
          console.log('partido encontrado', resp);
          this.partido = resp;
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

  buscarEquipos() {
    return [this.partido.equipoLocal, this.partido.equipoVisitante];
  }

  buscarJugadores() {
    let jugadores = [];
    let equipoSeleccionado = this.formGol.controls['equipo'].value;
    if(equipoSeleccionado) {
      if(equipoSeleccionado == this.partido.equipoLocal._id) {
        jugadores = this.partido.equipoLocal.jugadores;
      } else {
        jugadores = this.partido.equipoVisitante.jugadores;
      }
    }
    return jugadores;
  }

  validarCampo(field: string) {
    return !this.formGol.get(field)?.valid && (this.formGol.get(field)?.dirty || this.formGol.get(field)?.touched);
  }

  guardar() {
    if (this.formGol.valid) {
      console.log('guardando partido', this.formGol.value);

      this.partidoService.agregarGol(this.idPartido, this.formGol.value).subscribe({
        next: (resp) => {
          console.log('gol agregado', resp);
          this.router.navigateByUrl('/partidos');
        },
        error: (err) => {
          console.log("error guardando el gol", err);
          alert('ha ocurrido un error guardando el gol');
        }
      });
    } else {
      console.log('no es valido', this.formGol.value)
      this.formGol.markAsDirty();
      this.formGol.markAllAsTouched();
    }
  }

}
