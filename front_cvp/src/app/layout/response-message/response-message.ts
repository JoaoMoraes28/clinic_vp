import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ModalResponse } from '../../services/modal-response/modal-response';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmButton } from '../../shared/button/confirm/confirm-button';
import { desactiveScroll } from '../../utils/renderer-document';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ro } from 'date-fns/locale';

@Component({
  imports: [ConfirmButton],
  selector: 'app-response-message',
  templateUrl: './response-message.html',
})
export class ResponseMessage {
  private readonly serviceResponseMessage = inject(ModalResponse);
  private readonly render = inject(Renderer2);
  private readonly location = inject(Location);
  private router = inject(Router);

  isOpenModal = toSignal(this.serviceResponseMessage.getModalResponseOpening());
  title = toSignal(this.serviceResponseMessage.getTitle(), { initialValue: '' });
  message = toSignal(this.serviceResponseMessage.getMessage(), { initialValue: '' });
  buttonLabel = toSignal(this.serviceResponseMessage.getButtonLabel(), { initialValue: '' });

  clickButtonModal(): void {
    this.serviceResponseMessage.setModalResponseOpening(false);

    desactiveScroll(true, this.render);

    this.serviceResponseMessage.getRouteNavigate().subscribe(value => {
      switch(value) {
        case (null): break;
        case (''): this.location.back(); break;
        default: this.router.navigate([value]);
      }
    })

  }
}
