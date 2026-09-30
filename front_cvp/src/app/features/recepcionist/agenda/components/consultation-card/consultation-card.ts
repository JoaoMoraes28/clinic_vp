import { Component, input, output } from '@angular/core';
import { Consultation } from '../../agenda';
import { date } from '../../../../../utils/date-hour';
import { formattedHour } from '../../../../../utils/date-hour';

@Component({
  imports: [],
  selector: 'app-consultation-card',
  templateUrl: './consultation-card.html',
})
export class ConsultationCard {
  consultation = input.required<Consultation>();
  openModal = output<void>();

  getColorLabelCard(status: string): string {
    const hourToday: string = date.toLocaleTimeString();

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

  openModalConsultation(): void {
    this.openModal.emit();
  }
}
