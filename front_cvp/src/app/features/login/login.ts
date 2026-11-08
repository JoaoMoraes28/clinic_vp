import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { InputLogin } from './components/input/input-login';
import { ConfirmButton } from '../../shared/button/confirm/confirm-button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, CredentialsLogin, ResponseLogin } from '../../repo/auth/auth';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

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
  pError = viewChild<ElementRef<HTMLParagraphElement>>('messageError');

  private router = inject(Router);
  private readonly serviceAuth = inject(Auth);
  private formBuilder = inject(FormBuilder);
  private _statusLogin = signal<string | null>('');
  readonly statusLogin = this._statusLogin.asReadonly();

  nameLogin = signal<string>("");
  isLoadingHidden = signal<boolean>(true);
  isErroMessageHidden = signal<boolean>(true);
  isSuccessLogin = signal<boolean>(false);

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

  async onSubmit(): Promise<void> {
    if (this.profileForm.valid) {
      this._statusLogin.set(null)
      await this.postAuth()

    } else if (!this.profileForm.controls.email.valid && !this.profileForm.controls.password.valid) {
      this._statusLogin.set('email and password')

    } else if (!this.profileForm.controls.email.valid) {
      this._statusLogin.set('email');

    } else if (!this.profileForm.controls.password.valid) {
      this._statusLogin.set('password');

    }
  }

  async postAuth(): Promise<void> {
    this.isErroMessageHidden.set(true);
    this.isLoadingHidden.set(false);

    const credentials: CredentialsLogin = {
      email: this.profileForm.get('email')!.value!,
      password: this.profileForm.get('password')!.value!
    }

    const response: ResponseLogin | HttpErrorResponse | false = await this.serviceAuth.postLogin(credentials);

    await this.valideResponseAuth(response);

  }

  async valideResponseAuth(auth: ResponseLogin | HttpErrorResponse | false): Promise<void> {
    this.isLoadingHidden.set(true);
    
    if (!(auth instanceof HttpErrorResponse) && auth !== false) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("accountName", auth.name);
      localStorage.setItem("accountId", auth.id.toString());
      localStorage.setItem("accountEmail", auth.email);
      localStorage.setItem("accountPhoto", auth.photo);

      this.nameLogin.set(auth.name);
      this.isSuccessLogin.set(true);
      
      setTimeout(() => {
        this.router.navigate(['/recepcionist/agenda'])
      }, 3000)

      return;
    }

    if (auth instanceof HttpErrorResponse) {
      const pElement = this.pError()?.nativeElement;
      this.isErroMessageHidden.set(false);

      switch (auth.status) {
        case (HttpStatusCode.InternalServerError):
          pElement!.innerText = "Ocorreu um erro no servidor. Tente novamente.";
          break;

        case (HttpStatusCode.Unauthorized):
          pElement!.innerText = "Email e/ou senha inválidas!";
          break;
      }
    }
  }
}
