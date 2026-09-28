import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-close',
  templateUrl: './close.html',
})
export class Close {
  iconColor = input.required<string>();
  width = input.required<number>();
  height = input.required<number>();
}
