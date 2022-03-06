import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NarradorService } from '../service/narrador.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formNarrador: FormGroup;
  errorSave: boolean;
  private isEdit: boolean;


  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    formBuilder: FormBuilder,
    private narradorService: NarradorService
  ) {
    this.isEdit = false;
    this.errorSave = false;
    this.formNarrador = formBuilder.group({
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    let id = this.activatedroute.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit = true;
      this.narradorService.buscarNarradores(id).subscribe({
        next: (resp) => {
          console.log('Narrador encontrado', resp);
          this.setFormData(resp);
        },
        error: (err) => {
          console.log("Error buscando narrador", err);
          alert('Ha ocurrido un error consultando el narrador');
        }
      });
    }
  }

  private setFormData(response: any) {
    this.formNarrador.controls['nombre'].setValue(response.nombre);
    if(this.isEdit) {
      this.formNarrador.addControl('_id', new FormControl(response._id, Validators.required));
    }
  }

  validarCampo(field: string) {
    return !this.formNarrador.get(field)?.valid && (this.formNarrador.get(field)?.dirty || this.formNarrador.get(field)?.touched);
  }

  save() {
    if (this.formNarrador.valid) {
      console.log('guardando narrador', this.formNarrador.value);
      this.narradorService.guardarNarradores(this.formNarrador.value).subscribe({
        next: (resp) => {
          console.log('Narrador guardado', resp);
          this.router.navigateByUrl('/narradores');
        },
        error: (err) => {
          console.log("Error guardando narrador", err);
          alert('Ha ocurrido un error guardando el narrador');
        }
      });
    } else {
      this.formNarrador.markAsDirty();
      this.formNarrador.markAllAsTouched();
    }
  }

}
