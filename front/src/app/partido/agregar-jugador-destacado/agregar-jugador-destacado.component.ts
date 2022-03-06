import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from '../service/partido.service';

@Component({
  selector: 'app-agregar-jugador-destacado',
  templateUrl: './agregar-jugador-destacado.component.html',
  styleUrls: ['./agregar-jugador-destacado.component.scss']
})
export class AgregarJugadorDestacadoComponent implements OnInit {
  partido: any;
  formJugadorDestacado: FormGroup;
  idPartido: string | null;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private partidoService: PartidoService,
    formBuilder: FormBuilder,
  ) {
    this.idPartido = '';
    this.formJugadorDestacado = formBuilder.group({
      equipo: [null, [Validators.required]],
      jugador: [null, [Validators.required]]
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
    let equipoSeleccionado = this.formJugadorDestacado.controls['equipo'].value;
    if (equipoSeleccionado) {
      if (equipoSeleccionado == this.partido.equipoLocal._id) {
        jugadores = this.partido.equipoLocal.jugadores;
      } else {
        jugadores = this.partido.equipoVisitante.jugadores;
      }
    }
    return jugadores;
  }

  validarCampo(field: string) {
    return !this.formJugadorDestacado.get(field)?.valid && (this.formJugadorDestacado.get(field)?.dirty || this.formJugadorDestacado.get(field)?.touched);
  }

  guardar() {
    if (this.formJugadorDestacado.valid) {
      console.log('guardando tarjeta', this.formJugadorDestacado.value);

      this.partidoService.agregarJugadorDestacado(this.idPartido, this.formJugadorDestacado.value).subscribe({
        next: (resp) => {
          console.log('jugador destacado agregado', resp);
          this.router.navigateByUrl('/partidos');
        },
        error: (err) => {
          console.log("error guardando el jugador destacado", err);
          alert('ha ocurrido un error guardando el jugador destacado');
        }
      });
    } else {
      console.log('no es valido', this.formJugadorDestacado.value)
      this.formJugadorDestacado.markAsDirty();
      this.formJugadorDestacado.markAllAsTouched();
    }
  }
}
