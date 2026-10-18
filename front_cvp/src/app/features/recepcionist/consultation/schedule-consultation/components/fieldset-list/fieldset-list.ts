import { Component, input } from '@angular/core';
import { ListDatas } from '../../schedule-consultation';
import { FormGroup } from '@angular/forms';
import { PatientPreview } from '../../../../patients/patients';

@Component({
  imports: [],
  selector: 'app-fieldset-list',
  templateUrl: './fieldset-list.html',
})
export class FieldsetList {
  list = input.required<ListDatas[]>();
  profileForm = input.required<FormGroup>();
  fieldForm = input.required<string>();
  getPatient = input<(id: number) => PatientPreview>();

  setValueInInput(value: string, field: string, id: number): void {

    if (field == 'patient') {
      const patient = this.getPatient()!(id);
      this.profileForm().patchValue({
        cpf: patient.cpf,
        phone: patient.phone
      })
    }

    this.profileForm().patchValue({
      [field]: value
    })
  }
}
