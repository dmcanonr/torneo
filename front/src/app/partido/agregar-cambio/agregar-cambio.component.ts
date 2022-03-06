import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from '../service/partido.service';

@Component({
  selector: 'app-agregar-cambio',
  templateUrl: './agregar-cambio.component.html',
  styleUrls: ['./agregar-cambio.component.scss']
})
export class AgregarCambioComponent implements OnInit {
  partido: any;
  formCambio: FormGroup;
  idPartido: string | null;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private partidoService: PartidoService,
    formBuilder: FormBuilder,
  ) {
    this.idPartido = '';
    this.formCambio = formBuilder.group({
      equipo: [null, [Validators.required]],
      jugadorEntra: [null, [Validators.required]],
      jugadorSale: [null, [Validators.required]],
      minuto: [null, [Validators.required]]
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
    let equipoSeleccionado = this.formCambio.controls['equipo'].value;
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
    return !this.formCambio.get(field)?.valid && (this.formCambio.get(field)?.dirty || this.formCambio.get(field)?.touched);
  }

  guardar() {
    if (this.formCambio.valid) {
      console.log('guardando tarjeta', this.formCambio.value);

      this.partidoService.agregarCambio(this.idPartido, this.formCambio.value).subscribe({
        next: (resp) => {
          console.log('cambio agregado', resp);
          this.router.navigateByUrl('/partidos');
        },
        error: (err) => {
          console.log("error guardando el cambio", err);
          alert('ha ocurrido un error guardando el cambio');
        }
      });
    } else {
      console.log('no es valido', this.formCambio.value)
      this.formCambio.markAsDirty();
      this.formCambio.markAllAsTouched();
    }
  }

}
