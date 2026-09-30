import { Component, input, output } from '@angular/core';
import { Close } from '../../../../../svg/close/close';
import { ProfilePerson } from '../../../../../svg/profile-person/profile-person';
import { InformationLabel } from '../../../../../shared/information-label/information-label';
import { DataInformationLabel } from '../../patients';

@Component({
  imports: [Close, ProfilePerson, InformationLabel],
  selector: 'app-patient-datas',
  templateUrl: './patient-datas.html',
})
export class PatientDatas {
  patientDatas = input.required<DataInformationLabel[]>();
  changeIsOpening = output<void>();

  changeModalOpening(): void {
    this.changeIsOpening.emit();
  }
}
