import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.html',
})
export class CancelButton {
  buttonType = input<string>();
  buttonLabel = input.required<string>();
  clickFunction = output<void>();

  onClick() {
    this.clickFunction.emit();
  }
}
