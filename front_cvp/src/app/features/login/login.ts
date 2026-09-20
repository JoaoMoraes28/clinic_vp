import { Component, inject, signal } from '@angular/core';
import { InputLogin } from './components/input/input-login';
import { ConfirmButton } from '../../shared/button/confirm/confirm-button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from '@angular/router';

interface InputData {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  valueInput: string;
  inputImg: string;
  validField: boolean;
  errorMessage: string;
}

@Component({
  imports: [InputLogin, ConfirmButton, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private _statusLogin = signal<string | null>('');
  readonly statusLogin = this._statusLogin.asReadonly();

  profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  inputsData: InputData[] = [
    {
      id: 'email',
      type: 'email',
      label: 'Digite seu email',
      placeholder: 'email@clinic.com',
      valueInput: '',
      inputImg: 'images/Person_icon.svg',
      validField: this.profileForm.controls.email.valid,
      errorMessage: 'Campo email vazio ou inválido!'
    },
    {
      id: 'password',
      type: 'password',
      label: 'Digite sua senha',
      placeholder: '*********',
      valueInput: '',
      inputImg: 'images/Password_icon.png',
      validField: this.profileForm.controls.password.valid,
      errorMessage: 'Campo senha vazia ou inválida!'
    }
  ];

  onSubmit() {
    if (this.profileForm.valid) {
      this._statusLogin.set(null)
      this.router.navigate(['/recepcionist/agenda'])

    } else if (!this.profileForm.controls.email.valid && !this.profileForm.controls.password.valid) {
      this._statusLogin.set('email and password')

    } else if (!this.profileForm.controls.email.valid) {
      this._statusLogin.set('email');

    } else if (!this.profileForm.controls.password.valid) {
      this._statusLogin.set('password');

    } 
  }
}
