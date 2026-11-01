import { Component, input, OnInit, output } from '@angular/core';
import { ProfilePerson } from '../../../../../svg/profile-person/profile-person';
import { ButtonAgendConsultation } from '../button-agend-consultation/button-agend-consultation';
import { PatientPreview } from '../../../../../repo/patient/patient';
import { formattedCPF, formattedPhone } from '../../../../../utils/formatted-datas';

@Component({
  imports: [ProfilePerson, ButtonAgendConsultation],
  selector: 'app-patient-card',
  templateUrl: './patient-card.html',
})
export class PatientCard implements OnInit {
  patient = input.required<PatientPreview>();
  changeIsOpening = output<void>();
  changeScheduleConsultationOpening = output<void>();

  changeModalOpening(): void {
    this.changeIsOpening.emit();
  }

  changeScheduleOpening(): void {
    this.changeScheduleConsultationOpening.emit();
  }

  ngOnInit(): void {
    this.patient().phone = formattedPhone(this.patient().phone);
    this.patient().cpf = formattedCPF(this.patient().cpf);
  }
}
