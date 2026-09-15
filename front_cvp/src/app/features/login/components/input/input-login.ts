import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-input-login',
  templateUrl: './input-login.html',
})
export class InputLogin {
  id = input<string>()
  type = input<string>()
  label = input<string>();
  valueInput = input<string>();
  placeholder = input<string>();
  inputImg = input<string>();
}
