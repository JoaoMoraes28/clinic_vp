import { Component } from '@angular/core';
import { InputLogin } from './components/input/input-login';
import { ConfirmButton } from '../../shared/button/confirm/confirm-button';

interface InputData {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  valueInput: string;
  inputImg: string;
}

@Component({
  imports: [InputLogin, ConfirmButton],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  inputsData: InputData[] = [
    {
      id: 'email',
      type: 'email',
      label: 'Digite seu email',
      placeholder: 'email@clinic.com',
      valueInput: '',
      inputImg: 'images/Person_CPF.png'
    },
    {
      id: 'password',
      type: 'password',
      label: 'Digite sua senha',
      placeholder: '*********',
      valueInput: '',
      inputImg: 'images/Password_icon.png'
    }
  ]

  event() {
    console.log(123)
  }
}
