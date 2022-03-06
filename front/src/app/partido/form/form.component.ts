import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from 'src/app/equipo/service/equipo.service';
import { PartidoService } from '../service/partido.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  equipos: Array<any>;
  arbitrosLinea: Array<any>;
  arbitrosCentrales: Array<any>;
  narradores: Array<any>;
  formPartido: FormGroup;
  errorSave: boolean;
  private isEdit: boolean;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private equipoService: EquipoService,
    private partidoService: PartidoService,
    formBuilder: FormBuilder,
  ) {
    this.errorSave = false;
    this.isEdit = false;
    this.equipos = new Array<any>();
    this.arbitrosLinea = new Array<any>();
    this.arbitrosCentrales = new Array<any>();
    this.narradores = new Array<any>();
    this.formPartido = formBuilder.group({
      equipoLocal: [null, [Validators.required]],
      equipoVisitante: [null, [Validators.required]],
      colorLocal: ['', [Validators.required]],
      colorVisitante: ['', [Validators.required]],
      arbitroLinea1: [null, [Validators.required]],
      arbitroLinea2: [null, [Validators.required]],
      arbitroCentral: [null, [Validators.required]],
      narrador: [null, [Validators.required]]
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
    this.partidoService.listarArbitros().subscribe({
      next: (resp) => {
        this.arbitrosLinea = (resp as Array<any>).filter(item => item.tipo == 'linea');
        this.arbitrosCentrales = (resp as Array<any>).filter(item => item.tipo == 'central');
      },
      error: (err) => {
        console.log("error buscando arbitros", err);
        alert('ha ocurrido un error buscando el listado de arbitros');
      }
    });
    this.partidoService.listarNarradores().subscribe({
      next: (resp) => {
        this.narradores = (resp as Array<any>);
      },
      error: (err) => {
        console.log("error buscando narradores", err);
        alert('ha ocurrido un error buscando el listado de narradores');
      }
    });


    if (id) {
      this.isEdit = true;
      this.partidoService.buscarPartido(id).subscribe({
        next: (resp) => {
          console.log('jugador encontrado', resp);
          this.setearDatosFormulario(resp);
        },
        error: (err) => {
          console.log("error buscando partido", err);
          alert('ha ocurrido un error consultando el partido');
        }
      });
    }
  }

  private setearDatosFormulario(response: any) {
    this.formPartido.controls['equipoLocal'].setValue(response.equipoLocal);
    this.formPartido.controls['equipoVisitante'].setValue(response.equipoVisitante);
    this.formPartido.controls['arbitroLinea1'].setValue(response.arbitroLinea1);
    this.formPartido.controls['arbitroLinea2'].setValue(response.arbitroLinea2);
    this.formPartido.controls['arbitroCentral'].setValue(response.arbitroCentral);
    if (this.isEdit) {
      this.formPartido.addControl('_id', new FormControl(response._id, Validators.required));
    }
  }

  validarCampo(field: string) {
    return !this.formPartido.get(field)?.valid && (this.formPartido.get(field)?.dirty || this.formPartido.get(field)?.touched);
  }

  guardar() {
    this.validarColorCamiseta();
    if (this.formPartido.valid) {
      console.log('guardando partido', this.formPartido.value);

      this.partidoService.guardarPartido(this.formPartido.value).subscribe({
        next: (resp) => {
          console.log('partido guardado', resp);
          this.router.navigateByUrl('/partidos');
        },
        error: (err) => {
          console.log("error guardando partido", err);
          alert('ha ocurrido un error guardando el partido');
        }
      });
    } else {
      console.log('no es valido', this.formPartido.value)
      this.formPartido.markAsDirty();
      this.formPartido.markAllAsTouched();
    }
  }

  private validarColorCamiseta() {
    let equiposEncontradosLocal = this.equipos.filter(equipoItem => equipoItem._id == this.formPartido.value.equipoLocal);
    console.log('equipo local', equiposEncontradosLocal);
    let camisetaLocal = '';
    let equiposEncontradosVisitante = this.equipos.filter(equipoItem => equipoItem._id == this.formPartido.value.equipoVisitante);
    let camisetaVisitante = '';
    if (equiposEncontradosLocal.length > 0) {
      camisetaLocal = equiposEncontradosLocal[0].color;
      console.log('asignando camiseta local', camisetaLocal);
      this.formPartido.controls['colorLocal'].setValue(camisetaLocal);
    }
    if (equiposEncontradosVisitante.length > 0) {
      camisetaVisitante = equiposEncontradosVisitante[0].color;
      this.formPartido.controls['colorVisitante'].setValue(camisetaVisitante);
    }


    let colores = ['rojo', 'blanco', 'negro', 'amarillo', 'azul', 'verde', 'naranja', 'café'];
    if (camisetaLocal && camisetaVisitante && (camisetaLocal == camisetaVisitante)) {
      alert('las camisetas son iguales, se asignará una random para el visitante');
      this.formPartido.controls['colorVisitante'].setValue(colores[Math.floor(Math.random() * colores.length)]);
    } 
  }

}
