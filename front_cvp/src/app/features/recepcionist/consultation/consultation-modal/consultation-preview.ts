import { Component, inject, output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Close } from '../../../../svg/close/close';
import { DataLabel } from '../../../../shared/data-label/data-label';
import { ConfirmButton } from '../../../../shared/button/confirm/confirm-button';
import { CancelButton } from '../../../../shared/button/cancel/cancel-button';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConsultationSelected } from '../../../../services/consultation-selected/consultation-selected';
import { HttpErrorResponse } from '@angular/common/http';
import { Consultation, WriteConsultationStatus } from '../../../../repo/consultation/consultation';
import { ValideResponseApi } from '../../../../services/valide-response/valide-response-api';
import { ModalResponse } from '../../../../services/modal-response/modal-response';
import { desactiveScroll } from '../../../../utils/renderer-document';

@Component({
  imports: [Close, DataLabel, ConfirmButton, CancelButton],
  selector: 'app-consultation-preview',
  templateUrl: './consultation-preview.html',
})
export class ConsultationPreview {
  router = inject(Router);
  closeModal = output<void>();

  private readonly renderer = inject(Renderer2);
  private readonly consultationSelected = inject(ConsultationSelected);
  private readonly serviceValide = inject(ValideResponseApi);
  private readonly serviceConsultation = inject(Consultation);
  private readonly serviceModalResponse = inject(ModalResponse);

  labelData = toSignal(this.consultationSelected.getConsultationSelected());
  idConsultationSelected = toSignal(this.consultationSelected.getIdConsultationSelected(), { initialValue: 0 });

  closeModalConsultation(): void {
    this.closeModal.emit();
  }

  async changeStatusConsultation(status: string): Promise<void> {
    const newStatus: WriteConsultationStatus = {
      new_status: status
    };

    const response: HttpErrorResponse | boolean = await this.serviceConsultation.patchStatusConsultation(this.idConsultationSelected(), newStatus);

    const isValid: boolean = await this.serviceValide.valideResponse(response, "Mudanca de Status de Consulta");

    if (!(response instanceof HttpErrorResponse) && isValid) {
      let responseStatus: string;

      if (status == 'CANCELED') {
        responseStatus = "cancelada";

      } else {
        responseStatus = "em espera";
      }

      desactiveScroll(false, this.renderer)
      this.serviceModalResponse.constructorModalResponse(true, "Mudanca de Status de Consulta", `Status da consulta alterada para ${responseStatus}!`, "Concluir", '');

      this.closeModalConsultation();

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['recepcionist/agenda']);
      });
    }

  }
}
