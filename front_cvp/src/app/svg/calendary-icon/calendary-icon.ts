import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-calendary-icon',
  templateUrl: './calendary-icon.html',
})
export class CalendaryIcon {
  width = input.required<number>();
  height = input.required<number>();
  color = input.required<string>();
}
