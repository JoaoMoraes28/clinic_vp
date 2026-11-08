import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-output-loading',
  templateUrl: './output-loading.html',
})
export class OutputLoading {
  bgColor = input.required<string>();
}
