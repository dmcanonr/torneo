import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  errorLogin: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.errorLogin = false;
    this.formLogin = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  async login() {
    this.errorLogin = false;
    if (this.formLogin.valid) {
      // this.loginService.login(
      //   this.formLogin.controls['user'].value,
      //   this.formLogin.controls['password'].value
      // ).subscribe({
      //   next: (resp) => this.router.navigateByUrl('dashboard', { replaceUrl: true }),
      //   error: (err) => {
      //     console.log("en el login", err);
      //     this.errorLogin = true;
      //   }
      // });
      this.router.navigateByUrl('dashboard', { replaceUrl: true })
    } else {
      console.log('error en el formulario');
      this.formLogin.markAsDirty();
      this.formLogin.markAllAsTouched();
    }
  }

  validarCampo(field: string) {
    return !this.formLogin.get(field)?.valid && (this.formLogin.get(field)?.dirty || this.formLogin.get(field)?.touched);
  }

}
