import { Component, inject, input, output, WritableSignal } from '@angular/core';
import { Arrow } from '../../svg/arrow/arrow';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';

export interface InputDefault {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  validField: boolean;
  errorMessage: string;
  showArrow: boolean;
  readonly: boolean;
  mandatory: boolean;
  visibleList: WritableSignal<boolean>;
}

@Component({
  imports: [Arrow, ReactiveFormsModule],
  selector: 'app-input',
  templateUrl: './input.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class Input {
  inputDatas = input.required<InputDefault>();
  functionInput = output<string>();

  changeInputValue(value: string): void {
    this.functionInput.emit(value);
  }
}
