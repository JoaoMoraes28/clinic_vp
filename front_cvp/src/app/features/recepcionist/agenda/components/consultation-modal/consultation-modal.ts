import { Component, inject, output, Renderer2 } from '@angular/core';
import { LabelDatas, DataLabel } from '../../../../../shared/data-label/data-label';
import { Close } from '../../../../../svg/close/close';
import { ConfirmButton } from '../../../../../shared/button/confirm/confirm-button';
import { CancelButton } from '../../../../../shared/button/cancel/cancel-button';
import { getDateFormatted, formattedHour } from '../../../../../utils/date/date-hour';
import { Router } from '@angular/router';

@Component({
  imports: [Close, DataLabel, ConfirmButton, CancelButton],
  selector: 'app-consultation-modal',
  templateUrl: './consultation-modal.html',
})
export class ConsultationModal {
  router = inject(Router);
  renderer = inject(Renderer2);

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
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }
}
