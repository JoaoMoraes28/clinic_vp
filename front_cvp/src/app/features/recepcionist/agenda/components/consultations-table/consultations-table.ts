import { Component, computed, input, Signal } from '@angular/core';
import { ConsultationsData } from '../../agenda';
import { ConsultationCard } from '../consultation-card/consultation-card';
import { formattedHour } from '../../../../../utils/date/date';

@Component({
  imports: [ConsultationCard],
  selector: 'app-consultations-table',
  templateUrl: './consultations-table.html',
})
export class ConsultationsTable {
  consultationsData = input.required<ConsultationsData>();
  index = input.required<number>();

  headerColor: Signal<string> = computed(() => this.index() % 2 ? 'var(--blue-light)' : 'var(--blue-dark)');

  getFormattedHour(hour: string): string {
    return formattedHour(hour);
  }
}