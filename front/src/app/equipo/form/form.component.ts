import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formEquipo: FormGroup;
  errorSave: boolean;
  private isEdit: boolean;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    private equipoService: EquipoService
  ) {
    this.isEdit = false;
    this.errorSave = false;
    this.formEquipo = formBuilder.group({
      nombre: ['', [Validators.required]],
      color: ['', [Validators.required]],
      tecnico: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let id = this.activatedroute.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit = true;
      this.equipoService.buscarEquipo(id).subscribe({
        next: (resp) => {
          console.log('equipo encontrado', resp);
          this.setFormData(resp);
        },
        error: (err) => {
          console.log("error buscando equipos", err);
          alert('ha ocurrido un error consultando el equipo');
        }
      });
    }
  }

  private setFormData(response: any) {
    this.formEquipo.controls['nombre'].setValue(response.nombre);
    this.formEquipo.controls['color'].setValue(response.color);
    this.formEquipo.controls['tecnico'].setValue(response.tecnico);
    if(this.isEdit) {
      this.formEquipo.addControl('_id', new FormControl(response._id, Validators.required));
    }
  }

  validarCampo(field: string) {
    return !this.formEquipo.get(field)?.valid && (this.formEquipo.get(field)?.dirty || this.formEquipo.get(field)?.touched);
  }

  save() {
    if (this.formEquipo.valid) {
      console.log('guardando equipo', this.formEquipo.value);
      this.equipoService.guardarEquipo(this.formEquipo.value).subscribe({
        next: (resp) => {
          console.log('equipo gugardado', resp);
          this.router.navigateByUrl('/equipos');
        },
        error: (err) => {
          console.log("error gaurdando equipo", err);
          alert('ha ocurrido un error guardando el equipo');
        }
      });
    } else {
      this.formEquipo.markAsDirty();
      this.formEquipo.markAllAsTouched();
    }
  }

}
