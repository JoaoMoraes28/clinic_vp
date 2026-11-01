import { Component, inject, OnInit, Renderer2, signal } from '@angular/core';
import { InputSearchPatient } from './components/input-search-patient/input-search-patient';
import { AddPatientButton } from './components/add-patient-button/add-patient-button';
import { PatientCard } from './components/patient-card/patient-card';
import { getYearsDifference, date, getDateFormatted } from '../../../utils/date-hour';
import { PatientDatas } from './components/patient-datas/patient-datas';
import { translateBloodTypeBr, translateCivilStateBr, translateGenderBr } from '../../../utils/translate-datas';
import { formattedCPF, formattedPhone } from '../../../utils/formatted-datas';
import { desactiveScroll } from '../../../utils/renderer-document';
import { ScheduleConsultation } from '../consultation/schedule-consultation/schedule-consultation';
import { ActivatedRoute } from '@angular/router';
import { Patient, PatientPreview } from '../../../repo/patient/patient';
import { OutputLoading } from '../../../layout/loading-response/components/output-loading/output-loading';
import { HttpErrorResponse } from '@angular/common/http';
import { ValideResponseApi } from '../../../services/valide-response/valide-response-api';

export interface DataInformationLabel {
  label: string;
  value: string | number | null;
}

@Component({
  imports: [InputSearchPatient, AddPatientButton, PatientCard, PatientDatas, ScheduleConsultation, OutputLoading],
  selector: 'app-patients',
  templateUrl: './patients.html',
})
export class Patients implements OnInit {
  private readonly servicePatients = inject(Patient);
  private renderer = inject(Renderer2);
  private activateRoute = inject(ActivatedRoute);
  private readonly serviceValide = inject(ValideResponseApi);

  isModalLoadingOpening = signal<boolean>(true);
  patients = signal<PatientPreview[]>([]);

  patientPreview = signal<PatientPreview>({
    id: 0,
    name: '',
    cpf: '',
    medical_record_id: 0,
    phone: '',
    photo: ''
  });

  filteredPatients = signal<PatientPreview[]>(this.patients());

  isModalOpening = signal<boolean>(false);
  isModalScheduleConsultationOpen = signal(false);

  informationsLabel = signal<DataInformationLabel[]>([]);

  filterPatients(value: string): void {
    this.filteredPatients.set(this.patients().filter((it) => it.name.toLowerCase().includes(value.toLowerCase())));
  }

  async changeModalOpening(id: number): Promise<void> {
    desactiveScroll(this.isModalOpening(), this.renderer);

    const patient = await this.servicePatients.getPatient(id);

    if (patient instanceof HttpErrorResponse || !patient) {
      return;
    }

    this.patientPreview.set({
      id: patient.patient.id,
      name: patient.patient.name,
      cpf: formattedCPF(patient.patient.cpf),
      medical_record_id: patient.patient.medical_record_id,
      phone: formattedPhone(patient.patient.phone),
      photo: patient.patient.photo
    });

    const addressFormated: string = `${patient.address.street}, ${patient.address.number} - ${patient.address.district} - ${patient.address.city} - ${patient.address.uf_address}`;

    this.informationsLabel.set([
      {
        label: 'CPF',
        value: formattedCPF(patient.patient.cpf)
      },
      {
        label: 'Estado civil',
        value: translateCivilStateBr(patient.patient.civil_state)
      },
      {
        label: 'Gênero',
        value: translateGenderBr(patient.patient.gender)
      },
      {
        label: 'Profissão',
        value: patient.patient.professional ? patient.patient.professional : 'N/A'
      },
      {
        label: 'Email',
        value: patient.patient.email ? patient.patient.email : 'N/A'
      },
      {
        label: 'Telefone',
        value: formattedPhone(patient.patient.phone)
      },
      {
        label: 'Emergência',
        value: patient.patient.phone_emergency ? formattedPhone(patient.patient.phone_emergency) : 'N/A'
      },
      {
        label: 'Peso',
        value: patient.patient.weight ? patient.patient.weight : 'N/A'
      },
      {
        label: 'Altura',
        value: patient.patient.height ? patient.patient.height : 'N/A'
      },
      {
        label: 'Data de nascimento',
        value: getDateFormatted(patient.patient.born_date)
      },
      {
        label: 'Idade',
        value: getYearsDifference(patient.patient.born_date, date)
      },
      {
        label: 'Tipo sanguíneo',
        value: translateBloodTypeBr(patient.patient.blood_type)
      },
      {
        label: 'Cadastro',
        value: getDateFormatted(patient.patient.record_date)
      },
      {
        label: 'Endereço',
        value: addressFormated
      },
      {
        label: 'Descrição',
        value: patient.patient.notes ? patient.patient.notes : 'N/A'
      },
      {
        label: 'Nome',
        value: patient.patient.name
      },
      {
        label: 'Foto',
        value: patient.patient.photo
      }
    ])

    this.isModalOpening.set(!this.isModalOpening());
  }

  changeViewModalScheduleConsultation(): void {
    desactiveScroll(this.isModalScheduleConsultationOpen(), this.renderer);

    this.isModalScheduleConsultationOpen.set(!this.isModalScheduleConsultationOpen())
  }

  async ngOnInit(): Promise<void> {
    this.activateRoute.params.subscribe((params) => {
      const valueBool: boolean = params['open-modal'] == 'false' ? false : true;
      this.isModalScheduleConsultationOpen.set(valueBool);
    });

    const patients = await this.servicePatients.getPatientsPreview()

    if (Array.isArray(patients)) {
      this.patients.set(patients);
      this.filteredPatients.set(patients);
    }

    this.isModalLoadingOpening.set(false);
    this.serviceValide.valideResponseUfGet(patients, "Busca de Pacientes");
  }
}
