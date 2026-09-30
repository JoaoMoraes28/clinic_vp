import { Component, inject, Renderer2, signal } from '@angular/core';
import { InputSearchPatient } from './components/input-search-patient/input-search-patient';
import { AddPatientButton } from './components/add-patient-button/add-patient-button';
import { PatientCard } from './components/patient-card/patient-card';
import { getYearsDifference, date, getDateFormatted } from '../../../utils/date-hour';
import { PatientDatas } from './components/patient-datas/patient-datas';
import { translateBloodType, translateCivilState, translateGender } from '../../../utils/translate-datas';
import { formattedCPF, formattedPhone } from '../../../utils/formatted-datas';

export interface Patient {
  name: string;
  professional: string;
  cpf: string;
  gender: string;
  phone: string;
  email: string;
  civil_state: string;
  photo: string;
  blood_type: string;
  weight: number;
  height: number;
  born_date: string;
  phone_emergency: string;
  notes: string;
  id: number;
  record_date: string;
  active: boolean;
  medical_record_id: number;
}

export interface PatientAddress {
  city: string;
  district: string;
  street: string;
  number: string;
  cep: string;
  uf_address: string;
}

export interface PatientModel {
  patient: Patient;
  address: PatientAddress;
}

export interface PatientPreview {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  photo: string;
  medical_record_id: number;
}

export interface DataInformationLabel {
  label: string;
  value: string | number;
}

@Component({
  imports: [InputSearchPatient, AddPatientButton, PatientCard, PatientDatas],
  selector: 'app-patients',
  templateUrl: './patients.html',
})
export class Patients {
  private renderer = inject(Renderer2);

  patientId: PatientModel = {
    patient: {
      name: 'João da Silva',
      professional: 'Desenvolvedor de Software',
      cpf: '12345678910',
      gender: 'MALE',
      phone: '11987654321',
      email: 'joao.silva@example.com',
      civil_state: 'SINGLE',
      photo: 'https://example.com/photos/joao-silva.jpg',
      blood_type: 'O_POSITIVE',
      weight: 68.5,
      height: 1.7,
      born_date: '2005-06-15',
      phone_emergency: '11912345678',
      notes: 'Paciente sem observações adicionais.',
      id: 1,
      record_date: '2026-09-29',
      active: true,
      medical_record_id: 1
    },
    address: {
      city: 'Jandira',
      district: 'Centro',
      street: 'Rua das Flores',
      number: '150',
      cep: '06600-000',
      uf_address: 'SP'
    }
  }

  patients: PatientPreview[] = [
    {
      id: 1,
      name: 'João da Silva Costa Henrique',
      cpf: '123.456.789-01',
      phone: '(11) 98765-4321',
      photo: 'assets/images/patients/patient-1.jpg',
      medical_record_id: 101
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      cpf: '234.567.890-12',
      phone: '(11) 97654-3210',
      photo: 'assets/images/patients/patient-2.jpg',
      medical_record_id: 102
    },
    {
      id: 3,
      name: 'Carlos Santos',
      cpf: '345.678.901-23',
      phone: '(11) 96543-2109',
      photo: 'assets/images/patients/patient-3.jpg',
      medical_record_id: 103
    },
    {
      id: 4,
      name: 'Ana Souza',
      cpf: '456.789.012-34',
      phone: '(11) 95432-1098',
      photo: 'assets/images/patients/patient-4.jpg',
      medical_record_id: 104
    },
    {
      id: 5,
      name: 'Pedro Almeida',
      cpf: '567.890.123-45',
      phone: '(11) 94321-0987',
      photo: 'assets/images/patients/patient-5.jpg',
      medical_record_id: 105
    },
    {
      id: 6,
      name: 'Juliana Costa',
      cpf: '678.901.234-56',
      phone: '(11) 93210-9876',
      photo: 'assets/images/patients/patient-6.jpg',
      medical_record_id: 106
    },
    {
      id: 7,
      name: 'Rafael Pereira',
      cpf: '789.012.345-67',
      phone: '(11) 92109-8765',
      photo: 'assets/images/patients/patient-7.jpg',
      medical_record_id: 107
    }
  ];

  addressFormated: string = `${this.patientId.address.street}, ${this.patientId.address.number} - ${this.patientId.address.district} - ${this.patientId.address.city} - ${this.patientId.address.uf_address}`;

  informationsLabel: DataInformationLabel[] = [
    {
      label: 'CPF',
      value: formattedCPF(this.patientId.patient.cpf)
    },
    {
      label: 'Estado civil',
      value: translateCivilState(this.patientId.patient.civil_state)
    },
    {
      label: 'Gênero',
      value: translateGender(this.patientId.patient.gender)
    },
    {
      label: 'Profissão',
      value: this.patientId.patient.professional
    },
    {
      label: 'Email',
      value: this.patientId.patient.email
    },
    {
      label: 'Telefone',
      value: formattedPhone(this.patientId.patient.phone)
    },
    {
      label: 'Emergência',
      value: formattedPhone(this.patientId.patient.phone_emergency)
    },
    {
      label: 'Peso',
      value: this.patientId.patient.weight
    },
    {
      label: 'Altura',
      value: this.patientId.patient.height
    },
    {
      label: 'Data de nascimento',
      value: getDateFormatted(this.patientId.patient.born_date)
    },
    {
      label: 'Idade',
      value: getYearsDifference(this.patientId.patient.born_date, date)
    },
    {
      label: 'Tipo sanguíneo',
      value: translateBloodType(this.patientId.patient.blood_type)
    },
    {
      label: 'Cadastro',
      value: getDateFormatted(this.patientId.patient.record_date)
    },
    {
      label: 'Endereço',
      value: this.addressFormated
    },
    {
      label: 'Descrição',
      value: this.patientId.patient.notes
    },
  ];

  filteredPatients = signal<PatientPreview[]>(this.patients)

  isModalOpening = signal<boolean>(false);

  filterPatients(value: string): void {
    this.filteredPatients.set(this.patients.filter((it) => it.name.toLowerCase().includes(value.toLowerCase())));
  }

  changeModalOpening(): void {
    this.isModalOpening() ? this.renderer.removeClass(document.body, 'overflow-hidden') : this.renderer.addClass(document.body, 'overflow-hidden');

    this.isModalOpening.set(!this.isModalOpening());
  }
}
