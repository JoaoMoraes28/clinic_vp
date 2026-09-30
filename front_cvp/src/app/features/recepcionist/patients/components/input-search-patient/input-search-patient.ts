import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-input-search-patient',
  templateUrl: './input-search-patient.html',
})
export class InputSearchPatient {
  filter = output<string>();

  filterCardPatients(value: string): void {
    this.filter.emit(value)
  }
}
