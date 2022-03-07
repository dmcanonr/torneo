import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from 'src/app/equipo/service/equipo.service';
import { JugadorService } from '../service/jugador.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  equipos: Array<any>;
  formJugador: FormGroup;
  errorSave: boolean;
  private isEdit: boolean;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    private jugadorService: JugadorService,
    private equipoService: EquipoService
  ) {
    this.isEdit = false;
    this.errorSave = false;
    this.equipos = new Array<any>();
    this.formJugador = formBuilder.group({
      nombre: ['', [Validators.required]],
      posicion: ['', [Validators.required]],
      camiseta: ['', [Validators.required, Validators.min(1)]],
      equipo: ['-1', [Validators.required]]
    });
  }

  ngOnInit(): void {
    let id = this.activatedroute.snapshot.paramMap.get("id");
    this.equipoService.listarEquipos().subscribe({
      next: (resp) => this.equipos = resp as Array<any>,
      error: (err) => {
        console.log("error buscando equipos", err);
        alert('ha ocurrido un error buscando el listado de equipos');
      }
    });
    if (id) {
      this.isEdit = true;
      this.jugadorService.buscarJugador(id).subscribe({
        next: (resp) => {
          console.log('jugador encontrado', resp);
          this.setearDatosFormulario(resp);
        },
        error: (err) => {
          console.log("error buscando jugador", err);
          alert('ha ocurrido un error consultando el jugador');
        }
      });
    }
  }

  private setearDatosFormulario(response: any) {
    this.formJugador.controls['nombre'].setValue(response.nombre);
    this.formJugador.controls['posicion'].setValue(response.posicion);
    this.formJugador.controls['camiseta'].setValue(response.camiseta);
    this.formJugador.controls['equipo'].setValue(response.equipo._id);
    if (this.isEdit) {
      this.formJugador.addControl('_id', new FormControl(response._id, Validators.required));
    }
  }

  validarCampo(field: string) {
    return !this.formJugador.get(field)?.valid && (this.formJugador.get(field)?.dirty || this.formJugador.get(field)?.touched);
  }

  guardar() {
    if (this.formJugador.valid) {
      if (this.formJugador.value.equipo != "-1") {
        console.log('guardando jugador', this.formJugador.value);
        this.jugadorService.guardarJugador(this.formJugador.value).subscribe({
          next: (resp) => {
            console.log('jugador guardado', resp);
            this.router.navigateByUrl('/jugadores');
          },
          error: (err) => {
            console.log("error guardando jugador", err);
            alert('ha ocurrido un error guardando el jugador');
          }
        });
      } else {
        alert('por favor seleccione un equipo para el jugador');
      }
    } else {
      this.formJugador.markAsDirty();
      this.formJugador.markAllAsTouched();
    }
  }

}
