import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Navigation } from '../../services/navigation/navigation';

@Component({
  imports: [],
  selector: 'app-registration-patient',
  templateUrl: './registration-patient.html',
})
export class RegistrationPatient {
  navigation = inject(Navigation)
  iconSelected = toSignal(this.navigation.getActiveIcon(), {initialValue: ''})

  iconColor: Signal<string> = computed(() =>
    this.iconSelected() == 'Cadastro de paciente' ? 'var(--blue-dark)' : 'var(--white-default)');
}
