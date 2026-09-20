import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Navigation } from '../../services/navigation/navigation';

@Component({
  imports: [],
  selector: 'app-schedule-consultation',
  templateUrl: './schedule-consultation.html',
})
export class ScheduleConsultation {
  navigation = inject(Navigation)
  iconSelected = toSignal(this.navigation.getActiveIcon(), { initialValue: '' })

  iconColor: Signal<string> = computed(() =>
    this.iconSelected() == 'Agendar consulta' ? 'var(--blue-dark)' : 'var(--white-default)');
}

