import { Component, input } from '@angular/core';
import { DataInformationLabel } from '../../features/recepcionist/patients/patients';

@Component({
  imports: [],
  selector: 'app-information-label',
  templateUrl: './information-label.html',
})
export class InformationLabel {
  datas = input.required<DataInformationLabel>();
}
