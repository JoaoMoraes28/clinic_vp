import { Component, computed, input, output, Signal } from '@angular/core';
import { ConsultationsData } from '../../agenda';
import { ConsultationCard } from '../consultation-card/consultation-card';
import { formattedHour } from '../../../../../utils/date-hour';

@Component({
  imports: [ConsultationCard],
  selector: 'app-consultations-table',
  templateUrl: './consultations-table.html',
})
export class ConsultationsTable {
  consultationsData = input.required<ConsultationsData>();
  index = input.required<number>();
  openModal = output<void>();

  headerColor: Signal<string> = computed(() => this.index() % 2 ? 'var(--blue-light)' : 'var(--blue-dark)');

  getFormattedHour(hour: string): string {
    return formattedHour(hour);
  }

  changeOpenModal(): void {
    this.openModal.emit();
  }
}