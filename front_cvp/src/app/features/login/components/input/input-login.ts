import { Component, inject, input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-input-login',
  templateUrl: './input-login.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class InputLogin {
  id = input.required<string>()
  type = input.required<string>()
  label = input.required<string>();
  placeholder = input.required<string>();
  inputImg = input.required<string>();
  controlName = input.required<string>();
  invalidField = input.required<string | null>();
  errorMessage = input.required<string>();
}
