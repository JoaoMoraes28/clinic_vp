import { Component, inject, input, output } from '@angular/core';
import { PatientPreview } from '../../patients';
import { SelectedPatientConsultation } from '../../../../../services/select-patient/selected-patient-consultation';

@Component({
  imports: [],
  selector: 'app-button-agend-consultation',
  templateUrl: './button-agend-consultation.html',
})
export class ButtonAgendConsultation {
  private selectPatient = inject(SelectedPatientConsultation);

  openScheduleConsultation = output<void>();
  patient = input.required<PatientPreview>();

  openModalSchedule(): void {
    this.selectPatient.setPatientSelected(this.patient());
    this.openScheduleConsultation.emit();
  }
}
