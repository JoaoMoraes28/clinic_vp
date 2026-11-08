import { Component, computed, input, output, Signal } from '@angular/core';
import { ConsultationCard } from '../consultation-card/consultation-card';
import { formattedHour } from '../../../../../utils/date-hour';
import { ConsultationResponsePreview } from '../../../../../repo/consultation/consultation';

@Component({
  imports: [ConsultationCard],
  selector: 'app-consultations-table',
  templateUrl: './consultations-table.html',
})
export class ConsultationsTable {
  consultationsData = input.required<ConsultationResponsePreview>();
  index = input.required<number>();

  headerColor: Signal<string> = computed(() => this.index() % 2 ? 'var(--blue-light)' : 'var(--blue-dark)');

  getFormattedHour(hour: string): string {
    return formattedHour(hour);
  }
}