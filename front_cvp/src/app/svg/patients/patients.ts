import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Navigation } from '../../services/navigation/navigation';

@Component({
  imports: [],
  selector: 'app-patients',
  templateUrl: './patients.html',
})
export class Patients {
  navigation = inject(Navigation)
  iconSelected = toSignal(this.navigation.getActiveIcon(), { initialValue: '' })

  iconColor: Signal<string> = computed(() =>
    this.iconSelected() == '/recepcionist/patients/false' ? 'var(--blue-dark)' : 'var(--white-default)');
}
