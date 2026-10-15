import { Component, inject, input, output } from '@angular/core';
import { Close } from '../../../../../svg/close/close';
import { ProfilePerson } from '../../../../../svg/profile-person/profile-person';
import { InformationLabel } from '../../../../../shared/information-label/information-label';
import { DataInformationLabel, PatientPreview } from '../../patients';
import { ButtonAgendConsultation } from '../button-agend-consultation/button-agend-consultation';
import { SelectedPatientConsultation } from '../../../../../services/select-patient/selected-patient-consultation';

@Component({
  imports: [Close, ProfilePerson, InformationLabel, ButtonAgendConsultation],
  selector: 'app-patient-datas',
  templateUrl: './patient-datas.html',
})
export class PatientDatas {
  selectedPatient = inject(SelectedPatientConsultation);
  patientDatas = input.required<DataInformationLabel[]>();
  patientPreview = input.required<PatientPreview>();
  changeIsOpening = output<void>();
  changeScheduleConsultationOpen = output<void>();
  
  changeModalOpening(): void {
    this.selectedPatient.setPatientSelected(null);
    this.changeIsOpening.emit();
  }

  changeScheduleConsultation(): void {
    this.changeScheduleConsultationOpen.emit();
  }
}
