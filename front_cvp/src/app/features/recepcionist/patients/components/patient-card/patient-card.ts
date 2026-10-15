import { Component, input, output } from '@angular/core';
import { PatientPreview } from '../../patients';
import { ProfilePerson } from '../../../../../svg/profile-person/profile-person';
import { ButtonAgendConsultation } from '../button-agend-consultation/button-agend-consultation';

@Component({
  imports: [ProfilePerson, ButtonAgendConsultation],
  selector: 'app-patient-card',
  templateUrl: './patient-card.html',
})
export class PatientCard {
  patient = input.required<PatientPreview>();
  changeIsOpening = output<void>();
  changeScheduleConsultationOpening = output<void>();

  changeModalOpening(): void {
    this.changeIsOpening.emit();
  }

  changeScheduleOpening(): void {
    this.changeScheduleConsultationOpening.emit();
  }
}
