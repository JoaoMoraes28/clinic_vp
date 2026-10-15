import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { InputDefault, Input } from '../../../../shared/input/input';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CancelButton } from '../../../../shared/button/cancel/cancel-button';
import { ConfirmButton } from '../../../../shared/button/confirm/confirm-button';
import { Close } from '../../../../svg/close/close';
import { PatientPreview } from '../../patients/patients';
import { SelectedPatientConsultation } from '../../../../services/select-patient/selected-patient-consultation';
import { FieldsetList } from './components/fieldset-list/fieldset-list';

export interface Speciality {
  id: number;
  speciality_name: string;
}

export interface DoctorData {
  doctor: Doctor;
  address: Address;
}

export interface Doctor {
  name: string;
  crm: string;
  cpf: string;
  phone: string;
  email: string;
  bio: string;
  photo: string;
  status: string;
  gender: string;
  id: number;
  admission_date: string;
  uf_crm: string;
  contract: string;
  must_change_password: boolean;
}

export interface Address {
  city: string;
  district: string;
  street: string;
  number: string;
  cep: string;
  uf_address: string;
}

export interface ListDatas {
  id: number;
  value: string;
}

@Component({
  imports: [Input, CancelButton, ConfirmButton, Close, ReactiveFormsModule, FieldsetList],
  selector: 'app-schedule-consultation',
  templateUrl: './schedule-consultation.html',
})
export class ScheduleConsultation implements OnInit {
  private selectedPatient = inject(SelectedPatientConsultation);
  formBuilder = inject(FormBuilder);
  closeModal = output<void>();
  patientList = input.required<PatientPreview[]>();

  profileForm = this.formBuilder.group({
    patient: ['', [Validators.required]],
    cpf: ['', [Validators.required, Validators.maxLength(14)]],
    phone: ['', [Validators.required, Validators.maxLength(15)]],
    speciality: ['', [Validators.required]],
    doctor: ['', [Validators.required]],
    date: ['', [Validators.required]],
    hour: ['', [Validators.required]]
  })

  specialitys = signal<Speciality[]>([
    {
      id: 1,
      speciality_name: "Cardiologista"
    },
    {
      id: 2,
      speciality_name: "Urologista"
    },
    {
      id: 3,
      speciality_name: "Ginecologista"
    }
  ]);

  doctors = signal<DoctorData[]>([
    {
      doctor: {
        name: "Carlos Eduardo Silva",
        crm: "123456",
        cpf: "123.456.789-00",
        phone: "(11) 98888-7777",
        email: "carlos.silva@example.com",
        bio: "Médico especialista em cardiologia.",
        photo: "https://example.com/photos/carlos.jpg",
        status: "ACTIVE",
        gender: "MALE",
        id: 1,
        admission_date: "2024-03-15",
        uf_crm: "SP",
        contract: "CLT",
        must_change_password: false
      },
      address: {
        city: "São Paulo",
        district: "Vila Mariana",
        street: "Rua Domingos de Morais",
        number: "1500",
        cep: "04010-200",
        uf_address: "SP"
      }
    },
    {
      doctor: {
        name: "Fernanda Oliveira Santos",
        crm: "654321",
        cpf: "987.654.321-00",
        phone: "(11) 97777-6666",
        email: "fernanda.santos@example.com",
        bio: "Médica especialista em dermatologia.",
        photo: "https://example.com/photos/fernanda.jpg",
        status: "ACTIVE",
        gender: "FEMALE",
        id: 2,
        admission_date: "2025-08-20",
        uf_crm: "RJ",
        contract: "PJ",
        must_change_password: true
      },
      address: {
        city: "Rio de Janeiro",
        district: "Copacabana",
        street: "Avenida Nossa Senhora de Copacabana",
        number: "850",
        cep: "22060-002",
        uf_address: "RJ"
      }
    }
  ])

  dataPatients = computed(() => this.patientList().map(it => {
    return {
      id: it.id,
      value: it.name
    }
  }))

  dataSpeciality = signal<ListDatas[]>(
    this.specialitys().map(it => {
      return {
        id: it.id,
        value: it.speciality_name
      }
    })
  )

  dataDoctor = signal<ListDatas[]>(
    this.doctors().map(it => {
      return {
        id: it.doctor.id,
        value: it.doctor.name
      }
    })
  )

  filteredSpeciality = signal<ListDatas[]>(this.dataSpeciality());

  filteredPatients = signal<ListDatas[]>([]);

  filteredDoctors = signal<ListDatas[]>(this.dataDoctor());

  inputsDatas: InputDefault[] = [
    {
      id: 'patient',
      label: 'Paciente',
      showArrow: false,
      errorMessage: 'Paciente é obrigatório',
      validField: this.profileForm.controls.patient.valid,
      placeholder: 'Clique para selecionar',
      type: 'text',
      mandatory: true,
      readonly: false,
      visibleList: signal(false)
    },
    {
      id: 'cpf',
      label: 'CPF',
      showArrow: false,
      errorMessage: 'CPF é obrigatório',
      validField: this.profileForm.controls.cpf.valid,
      placeholder: 'Selecione o paciente',
      type: 'text',
      mandatory: true,
      readonly: true,
      visibleList: signal(false)
    },
    {
      id: 'phone',
      label: 'Telefone',
      showArrow: false,
      errorMessage: 'Telefone é obrigatório',
      validField: this.profileForm.controls.phone.valid,
      placeholder: 'Selecione o paciente',
      type: 'text',
      mandatory: true,
      readonly: true,
      visibleList: signal(false)
    },
    {
      id: 'speciality',
      label: 'Especialidade',
      showArrow: true,
      errorMessage: 'Especialidade é obrigatório',
      validField: this.profileForm.controls.speciality.valid,
      placeholder: 'Clique para selecionar',
      type: 'text',
      mandatory: true,
      readonly: false,
      visibleList: signal(false)
    },
    {
      id: 'doctor',
      label: 'Doutor(a)',
      showArrow: true,
      errorMessage: 'Doutor(a) é obrigatório',
      validField: this.profileForm.controls.doctor.valid,
      placeholder: 'Clique para selecionar',
      type: 'text',
      mandatory: true,
      readonly: false,
      visibleList: signal(false)
    },
    {
      id: 'date',
      label: 'Data',
      showArrow: false,
      errorMessage: 'Data é obrigatório',
      validField: this.profileForm.controls.date.valid,
      placeholder: '00/00/0000',
      type: 'date',
      mandatory: true,
      readonly: false,
      visibleList: signal(false)
    },
    {
      id: 'hour',
      label: 'Horário',
      showArrow: false,
      errorMessage: 'Horário é obrigatório',
      validField: this.profileForm.controls.hour.valid,
      placeholder: '00:00',
      type: 'time',
      mandatory: true,
      readonly: false,
      visibleList: signal(false)
    },
  ]

  OpenCloseModalSelector(id: string) {
    const inputData: InputDefault[] = this.inputsDatas.filter((it) => it.id == id);

    inputData[0].visibleList.set(!inputData[0].visibleList())
  }

  getPatientPreview(id: number): PatientPreview {
    const patient: PatientPreview[] = this.patientList().filter(it => it.id == id);

    return patient[0];
  }

  filterPatients(name: string): void {
    const filterResult: ListDatas[] = this.dataPatients().filter(it => it.value.toLowerCase().includes(name.toLowerCase()));

    this.filteredPatients.set(filterResult);
  }

  filterSpecialitys(name: string): void {
    const filterResult: ListDatas[] = this.dataSpeciality().filter(it => it.value.toLowerCase().includes(name.toLowerCase()));

    this.filteredSpeciality.set(filterResult);
  }

  filterDoctors(name: string): void {
    const doctors = this.dataDoctor().filter(it => it.value.toLowerCase().includes(name.toLowerCase()));

    this.filteredDoctors.set(doctors);
  }

  closeModalScheduleConsultation(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    if (!this.profileForm.valid) {
      console.log("Campos inválidos");

    } else {
      console.log(this.profileForm.value);
    }
  }

  ngOnInit(): void {

    this.selectedPatient.getSelectedPatient().subscribe(
      patient => {
        if (patient == null) {
          return

        } else {

          this.profileForm.patchValue({
            patient: patient.name,
            cpf: patient.cpf,
            phone: patient.phone
          })

        }
      }
    )

    this.filteredPatients.set(this.dataPatients());

  }
}
