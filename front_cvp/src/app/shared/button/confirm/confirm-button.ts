import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.html',
})
export class ConfirmButton {
  buttonType = input<string>();
  buttonLabel = input.required<string>();
  clickFunction = output<void>();

  onClick() {
    this.clickFunction.emit();
  }
}
