import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-arrow',
  templateUrl: './arrow.html',
})
export class Arrow {
  width = input.required<number>();
  height = input.required<number>();
  color = input.required<string>();
  rotate = input.required<number>();
}
