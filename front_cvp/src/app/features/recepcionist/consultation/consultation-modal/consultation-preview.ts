import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { Close } from '../../../../svg/close/close';
import { DataLabel, LabelDatas } from '../../../../shared/data-label/data-label';
import { ConfirmButton } from '../../../../shared/button/confirm/confirm-button';
import { CancelButton } from '../../../../shared/button/cancel/cancel-button';
import { formattedHour, getDateFormatted } from '../../../../utils/date-hour';

@Component({
  imports: [Close, DataLabel, ConfirmButton, CancelButton],
  selector: 'app-consultation-preview',
  templateUrl: './consultation-preview.html',
})
export class ConsultationPreview {
  router = inject(Router);

  closeModal = output<void>();

  labelData: LabelDatas[] = [
    {
      label: 'Paciente',
      value: 'Amanda Turci'
    },
    {
      label: 'CPF',
      value: '123.456.789-10'
    },
    {
      label: 'Telefone',
      value: '(11) 93294-7289'
    },
    {
      label: 'Especialidade',
      value: 'Cardiologista'
    },
    {
      label: 'Doutor(a)',
      value: 'Rodrigo Nunes Ferreira'
    },
    {
      label: 'Data',
      value: getDateFormatted(new Date('2026-09-23'))
    },
    {
      label: 'Horário',
      value: formattedHour('09:00:00')
    }
  ];

  closeModalConsultation(): void {
    this.closeModal.emit();
  }
}
