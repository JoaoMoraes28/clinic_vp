import { Component, input } from '@angular/core';

export interface LabelDatas {
  label: string;
  value: string | Date;
}

@Component({
  imports: [],
  selector: 'app-data-label',
  templateUrl: './data-label.html',
})
export class DataLabel {
  labelData = input.required<LabelDatas>();
}
