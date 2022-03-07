import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from '../service/partido.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.scss']
})
export class AgregarTarjetaComponent implements OnInit {
  partido: any;
  formTarjeta: FormGroup;
  idPartido: string | null;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private partidoService: PartidoService,
    formBuilder: FormBuilder,
  ) {
    this.idPartido = '';
    this.formTarjeta = formBuilder.group({
      equipo: [null, [Validators.required]],
      jugador: [null, [Validators.required]],
      minuto: ['', [Validators.required, Validators.min(1)]],
      tipo: [null, [Validators.required]]
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
    let equipoSeleccionado = this.formTarjeta.controls['equipo'].value;
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
    return !this.formTarjeta.get(field)?.valid && (this.formTarjeta.get(field)?.dirty || this.formTarjeta.get(field)?.touched);
  }

  guardar() {
    if (this.formTarjeta.valid) {
      console.log('guardando tarjeta', this.formTarjeta.value);

      this.partidoService.agregarTarjeta(this.idPartido, this.formTarjeta.value).subscribe({
        next: (resp) => {
          console.log('tarjeta agregada', resp);
          this.router.navigateByUrl('/partidos');
        },
        error: (err) => {
          console.log("error guardando la tarjeta", err);
          alert('ha ocurrido un error guardando la tarjeta');
        }
      });
    } else {
      console.log('no es valido', this.formTarjeta.value)
      this.formTarjeta.markAsDirty();
      this.formTarjeta.markAllAsTouched();
    }
  }

}
