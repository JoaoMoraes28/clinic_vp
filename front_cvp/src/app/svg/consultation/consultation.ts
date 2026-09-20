import { Component, computed, inject, Signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Navigation } from '../../services/navigation/navigation';

@Component({
  imports: [],
  selector: 'app-consultation',
  templateUrl: './consultation.html',
})
export class Consultation {
  navigation = inject(Navigation)
  iconSelected = toSignal(this.navigation.getActiveIcon(), {initialValue: ''})

  iconColor: Signal<string> = computed(() =>
    this.iconSelected() == 'Consultas' ? 'var(--blue-dark)' : 'var(--white-default)');
}
