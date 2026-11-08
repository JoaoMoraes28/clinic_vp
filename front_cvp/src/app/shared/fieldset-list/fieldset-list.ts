import { Component, input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PatientPreview } from '../../repo/patient/patient';
import { formattedPhone, formattedCPF } from '../../utils/formatted-datas';

export interface DatasList {
  id: number;
  value: string;
}

export interface FullDatasList {
  emptyMessage: string;
  dataList: DatasList[]
}

@Component({
  imports: [],
  selector: 'app-fieldset-list',
  templateUrl: './fieldset-list.html',
})
export class FieldsetList implements OnInit {
  list = input.required<FullDatasList>();
  profileForm = input.required<FormGroup>();
  fieldForm = input.required<string>();
  getPatient = input<(id: number) => PatientPreview>();

  ngOnInit(): void {
    console.log(this.list().dataList.length)
  }

  setValueInInput(value: string, field: string, id: number): void {
    switch (field) {
      case 'patient': {
        const patient = this.getPatient()!(id);
        this.profileForm().patchValue({
          cpf: formattedCPF(patient.cpf),
          phone: formattedPhone(patient.phone),
          patientId: id.toString(),
          medicalRecordId: patient.medical_record_id.toString()
        })
        break;
      }
      case 'doctor': {
        this.profileForm().patchValue({
          doctorId: id
        })
        break;
      }
      case 'speciality': {
        this.profileForm().patchValue({
          specialityId: id
        })
        break;
      }
    }

    this.profileForm().patchValue({
      [field]: value
    })
  }
}
