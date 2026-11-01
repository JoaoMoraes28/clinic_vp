import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingMessage } from '../../../services/loading-message/loading-message';
import { OutputLoading } from '../components/output-loading/output-loading';

@Component({
  imports: [OutputLoading],
  selector: 'app-loading-response',
  templateUrl: './loading-response.html',
})
export class LoadingResponse {
  private readonly serviceLoadingModal = inject(LoadingMessage);

  isModalOpening = toSignal(this.serviceLoadingModal.getModalLoadingOpening(), { initialValue: false });
}
