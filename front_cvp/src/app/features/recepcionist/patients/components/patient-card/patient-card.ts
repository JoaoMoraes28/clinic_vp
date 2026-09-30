import { Component, input, output } from '@angular/core';
import { PatientPreview } from '../../patients';
import { ProfilePerson } from '../../../../../svg/profile-person/profile-person';

@Component({
  imports: [ProfilePerson],
  selector: 'app-patient-card',
  templateUrl: './patient-card.html',
})
export class PatientCard {
  patient = input.required<PatientPreview>();
  changeIsOpening = output<void>();

  changeModalOpening(): void {
    this.changeIsOpening.emit();
  }
}
