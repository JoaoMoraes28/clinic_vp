import { Component, inject, input, output } from '@angular/core';
import { Consultation, ConsultationAccess, ConsultationPreview } from '../../../../../repo/consultation/consultation';
import { ConsultationSelected } from '../../../../../services/consultation-selected/consultation-selected';
import { HttpErrorResponse } from '@angular/common/http';
import { ValideResponseApi } from '../../../../../services/valide-response/valide-response-api';
import { LabelDatas } from '../../../../../shared/data-label/data-label';
import { getDateFormatted, formattedHour } from '../../../../../utils/date-hour';
import { formattedPhone, formattedCPF } from '../../../../../utils/formatted-datas';

@Component({
  imports: [],
  selector: 'app-consultation-card',
  templateUrl: './consultation-card.html',
})
export class ConsultationCard {
  consultation = input.required<ConsultationPreview>();
  private readonly serviceConsultation = inject(Consultation);
  private readonly serviceConsultationSelected = inject(ConsultationSelected);
  private readonly serviceValide = inject(ValideResponseApi);

  getColorLabelCard(status: string): string {
    if (status == 'CANCELED') {
      return 'var(--red-light)';

    } else if (status == 'WAITING') {
      return 'var(--blue-cian)';

    } else if (status == 'COMPLETED') {
      return 'var(--green-default)';

    } else if (status == 'SCHEDULED') {
      return 'var(--blue-dark)';

    }

    return 'var(--white-default)';
  }

  getFormattedHour(hour: string): string {
    return formattedHour(hour);
  }

  async openModalConsultation(): Promise<void> {
    await this.getConsultationDatas();

    this.serviceConsultationSelected.setConsultationModal(true);
  }

  async getConsultationDatas(): Promise<void> {
    const response: ConsultationAccess | HttpErrorResponse | false = await this.serviceConsultation.getConsultationById(this.consultation().id);

    const isValid: boolean = await this.serviceValide.valideResponse(response, "Busca de Consulta");

    if (response && !(response instanceof HttpErrorResponse) && isValid) {
      const dataFormatted = await this.formatterConsultationDatas(response);
      
      this.serviceConsultationSelected.setIdConsultationSelected(response.id);
      this.serviceConsultationSelected.setConsultationSelected(dataFormatted);
    }

    
  }

  async formatterConsultationDatas(consultation: ConsultationAccess): Promise<LabelDatas[]> {
    const datasConsultation: LabelDatas[] = [
      {
        label: 'Paciente',
        value: consultation.patient_name
      },
      {
        label: 'CPF',
        value: formattedCPF(consultation.cpf)
      },
      {
        label: 'Telefone',
        value: formattedPhone(consultation.phone)
      },
      {
        label: 'Especialidade',
        value: consultation.speciality_name
      },
      {
        label: 'Doutor(a)',
        value: consultation.doctor_name
      },
      {
        label: 'Data',
        value: getDateFormatted(consultation.consultation_date)
      },
      {
        label: 'Horário',
        value: formattedHour(consultation.hour)
      }
    ]

    return datasConsultation;

  }
}
