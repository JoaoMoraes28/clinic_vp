import { Component, inject, OnInit, output, Renderer2, signal } from '@angular/core';
import { InputDefault, Input } from '../../../../shared/input/input';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CancelButton } from '../../../../shared/button/cancel/cancel-button';
import { ConfirmButton } from '../../../../shared/button/confirm/confirm-button';
import { Close } from '../../../../svg/close/close';
import { SelectedPatientConsultation } from '../../../../services/select-patient/selected-patient-consultation';
import { FieldsetList, DatasList, FullDatasList } from '../../../../shared/fieldset-list/fieldset-list';
import { Patient, PatientPreview } from '../../../../repo/patient/patient';
import { Speciality, SpecialityResponse } from '../../../../repo/speciality/speciality';
import { ValideResponseApi } from '../../../../services/valide-response/valide-response-api';
import { Doctor, DoctorData, DoctorSpeciality } from '../../../../repo/doctor/doctor';
import { Consultation, ConsultationWrite, HourAvaliableConsultation } from '../../../../repo/consultation/consultation';
import { ReturnMessageCreateElement } from '../../../../repo/dto-response-standart/interface-response';
import { desactiveScroll } from '../../../../utils/renderer-document';
import { ModalResponse } from '../../../../services/modal-response/modal-response';
import { LoadingMessage } from '../../../../services/loading-message/loading-message';
import { Router } from '@angular/router';

@Component({
  imports: [Input, CancelButton, ConfirmButton, Close, ReactiveFormsModule, FieldsetList],
  selector: 'app-schedule-consultation',
  templateUrl: './schedule-consultation.html',
})
export class ScheduleConsultation implements OnInit {
  private selectedPatient = inject(SelectedPatientConsultation);
  private readonly serviceSpecialitys = inject(Speciality);
  private readonly serviceValide = inject(ValideResponseApi);
  private readonly serviceDoctor = inject(Doctor);
  private readonly serviceConsultation = inject(Consultation);
  private readonly servicePatient = inject(Patient);
  private readonly serviceModalResponse = inject(ModalResponse);
  private readonly serviceLoadingModal = inject(LoadingMessage);
  private readonly router = inject(Router);
  closeModal = output<void>();
  formBuilder = inject(FormBuilder);
  renderer = inject(Renderer2);

  profileForm = this.formBuilder.group({
    patient: ['', [Validators.required]],
    cpf: ['', [Validators.required, Validators.maxLength(14)]],
    phone: ['', [Validators.required, Validators.maxLength(15)]],
    speciality: ['', [Validators.required]],
    doctor: ['', [Validators.required]],
    date: ['', [Validators.required]],
    hour: ['', [Validators.required]],
    //-----------------------------------//
    patientId: ['', [Validators.required]],
    specialityId: ['', [Validators.required]],
    doctorId: ['', [Validators.required]],
    medicalRecordId: ['', [Validators.required]]
  })

  patientList = signal<PatientPreview[]>([])

  specialitys = signal<SpecialityResponse[]>([]);

  doctors = signal<DoctorData[]>([])

  dataPatients = signal<DatasList[]>([]);

  dataSpeciality = signal<DatasList[]>([]);

  dataDoctor = signal<DatasList[]>([]);

  emptyMessageHour: string = "Nenhum horário disponível encontrado. Verifique o campo de especialidade e doutor(a).";
  emptyMessagePatient: string = "Nenhum paciente encontrado.";
  emptyMessageDoctor: string = "Nenhum doutor(a) encontrado. Verifique a busca de especialidade.";
  emptyMessageSpeciality: string = "Nenhuma especialidade encontrado.";

  dataHourAvaliable = signal<FullDatasList>({
    emptyMessage: this.emptyMessageHour,
    dataList: []
  });

  filteredSpeciality = signal<FullDatasList>({
    emptyMessage: this.emptyMessageSpeciality,
    dataList: []
  });

  filteredPatients = signal<FullDatasList>({
    emptyMessage: this.emptyMessagePatient,
    dataList: []
  });

  filteredDoctors = signal<FullDatasList>({
    emptyMessage: this.emptyMessageDoctor,
    dataList: []
  });

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
      readonly: true,
      visibleList: signal(false)
    },
  ]

  closeOnClickModal(e: Event) {
    const element = e.target as HTMLElement;

    if (element.id == 'patient') {
      this.inputsDatas[3].visibleList.set(false);
      this.inputsDatas[4].visibleList.set(false);
      this.inputsDatas[6].visibleList.set(false);
      return;

    } else if (element.id == 'speciality') {
      this.inputsDatas[0].visibleList.set(false);
      this.inputsDatas[4].visibleList.set(false);
      this.inputsDatas[6].visibleList.set(false);
      return;

    } else if (element.id == 'doctor') {
      this.inputsDatas[0].visibleList.set(false);
      this.inputsDatas[3].visibleList.set(false);
      this.inputsDatas[6].visibleList.set(false);
      return;

    } else if (element.id == 'hour') {
      this.inputsDatas[0].visibleList.set(false);
      this.inputsDatas[3].visibleList.set(false);
      this.inputsDatas[4].visibleList.set(false);
      return;

    }

    this.inputsDatas[0].visibleList.set(false);
    this.inputsDatas[3].visibleList.set(false);
    this.inputsDatas[4].visibleList.set(false);
    this.inputsDatas[6].visibleList.set(false);
  }

  openCloseModalSelector(id: string) {
    const inputData: InputDefault[] = this.inputsDatas.filter((it) => it.id == id);

    inputData[0].visibleList.set(!inputData[0].visibleList())
  }

  getPatientPreview(id: number): PatientPreview {
    const patient: PatientPreview[] = this.patientList().filter(it => it.id == id);

    return patient[0];
  }

  filterPatients(name: string): void {
    const filterResult: DatasList[] = this.dataPatients().filter(it => it.value.toLowerCase().includes(name.toLowerCase()));

    this.filteredPatients.set({
      emptyMessage: this.emptyMessagePatient,
      dataList: filterResult
    });
  }

  filterSpecialitys(name: string): void {
    const filterResult: DatasList[] = this.dataSpeciality().filter(it => it.value.toLowerCase().includes(name.toLowerCase()));

    this.filteredSpeciality.set({
      emptyMessage: this.emptyMessageSpeciality,
      dataList: filterResult
    });
  }

  filterDoctors(name: string): void {
    const doctors = this.dataDoctor().filter(it => it.value.toLowerCase().includes(name.toLowerCase()));

    this.filteredDoctors.set({
      emptyMessage: this.emptyMessageDoctor,
      dataList: doctors
    });
  }

  closeModalScheduleConsultation(): void {
    this.closeModal.emit();
    this.router.navigate(['/recepcionist/patients/false']);

  }

  async onSubmit(): Promise<void> {
    if (!this.profileForm.valid) {
      console.log("Campos inválidos");

    } else {
      this.serviceLoadingModal.setModalLoadingOpening(true);

      const consultationWrite: ConsultationWrite = {
        patient_id: Number(this.profileForm.get('patientId')?.value),
        doctor_id: Number(this.profileForm.get('doctorId')?.value),
        speciality_id: Number(this.profileForm.get('specialityId')?.value),
        consultation_date: this.profileForm.get('date')?.value!,
        hour: this.profileForm.get('hour')?.value!,
        recepcionist_id: 11,
        medical_record_id: Number(this.profileForm.get('medicalRecordId')?.value)
      }

      await this.postConsultation(consultationWrite);
    }
  }

  async postConsultation(consultation: ConsultationWrite): Promise<void> {
    const response: ReturnMessageCreateElement | unknown = await this.serviceConsultation.postConsultation(consultation);

    this.serviceLoadingModal.setModalLoadingOpening(false);

    const isValid: boolean = await this.serviceValide.valideResponse(response, "Cadastro de Consulta");

    desactiveScroll(false, this.renderer);

    if (!isValid) {
      return;
    }

    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Consulta", "Consulta agendada com sucesso!", "Concluir", null);
    this.closeModalScheduleConsultation();
  }

  async ngOnInit(): Promise<void> {
    const patients: PatientPreview[] | unknown = await this.servicePatient.getPatientsPreview();

    await this.getPatientsFormatter(patients);

    this.selectedPatient.getSelectedPatient().subscribe(
      patient => {
        if (patient == null) {
          return

        } else {

          this.profileForm.patchValue({
            patient: patient.name,
            cpf: patient.cpf,
            phone: patient.phone,
            patientId: patient.id.toString(),
            medicalRecordId: patient.medical_record_id.toString()
          })

        }
      }
    )

    this.profileForm.get('speciality')?.valueChanges.subscribe(speciality => {
      const specialityChoice: SpecialityResponse[] = this.specialitys().filter(it => it.speciality_name.toLowerCase() == speciality?.toLowerCase());

      if (specialityChoice[0]) {
        const idSpecialityString: string = specialityChoice[0].id.toString();
        this.profileForm.get('specialityId')?.setValue(idSpecialityString);

      } else {
        this.profileForm.get('specialityId')?.setValue(null);
      }
    })

    this.profileForm.get('patient')?.valueChanges.subscribe(patient => {
      const patientChoice: PatientPreview[] = this.patientList().filter(it => it.name.toLowerCase() == patient?.toLowerCase());

      if (patientChoice[0] && patientChoice.length == 1) {
        const idPatientString: string = patientChoice[0].id.toString();
        this.profileForm.get('patientId')?.setValue(idPatientString);

      } else {
        this.profileForm.get('patientId')?.setValue(null);
      }
    })

    this.profileForm.get('specialityId')?.valueChanges.subscribe(specialityId => {
      this.getDoctorsBySpeciality(Number(specialityId));

      this.profileForm.get('doctor')?.setValue("");
    })

    this.profileForm.get('doctor')?.valueChanges.subscribe(doctor => {
      this.profileForm.get('date')?.setValue("");
      this.profileForm.get('hour')?.setValue("");
    })

    this.profileForm.get('date')?.valueChanges.subscribe(date => {
      this.getHourAvaliable();
    })

    this.profileForm.get('doctorId')?.valueChanges.subscribe(doctorId => {
      this.getHourAvaliable();
    })

    this.filteredPatients.set({
      emptyMessage: this.emptyMessagePatient,
      dataList: this.dataPatients()
    });

    this.getSpecialitysFormatter();

  }

  async getPatientsFormatter(patients: PatientPreview[] | unknown): Promise<void> {
    if (Array.isArray(patients)) {
      const dataPatients: DatasList[] = patients.map(it => {
        return {
          id: it.id,
          value: it.name
        }
      })

      this.patientList.set(patients);
      this.dataPatients.set(dataPatients);
      this.filteredPatients.set({
        emptyMessage: this.emptyMessagePatient,
        dataList: dataPatients
      });
    }

    desactiveScroll(false, this.renderer);
    await this.serviceValide.valideResponse(patients, "Busca de pacientes");
  }

  async getSpecialitysFormatter(): Promise<void> {
    const specialitys = await this.serviceSpecialitys.getSpeciality();

    if (Array.isArray(specialitys)) {
      this.specialitys.set(specialitys);

      const dataSpeciality: DatasList[] = specialitys.map(it => {
        return {
          id: it.id,
          value: it.speciality_name
        }
      })

      this.dataSpeciality.set(dataSpeciality);
      this.filteredSpeciality.set({
        emptyMessage: this.emptyMessageSpeciality,
        dataList: dataSpeciality
      });

      return;
    }

    desactiveScroll(false, this.renderer);
    await this.serviceValide.valideResponse(specialitys, "Busca de Especialidades");
  }

  async getDoctorFormatter(doctors: DoctorSpeciality[] | unknown): Promise<void> {
    if (Array.isArray(doctors)) {
      this.doctors.set(doctors);

      const dataDoctor: DatasList[] = doctors.map(it => {
        return {
          id: it.doctor_id,
          value: it.name
        }
      })

      this.dataDoctor.set(dataDoctor);
      this.filteredDoctors.set({
        emptyMessage: this.emptyMessageDoctor,
        dataList: dataDoctor
      });

      return;
    }

    desactiveScroll(false, this.renderer);
    await this.serviceValide.valideResponse(doctors, "Busca de Doutores(as)")
  }

  async getHoursFormatter(hours: HourAvaliableConsultation[] | unknown): Promise<void> {
    if (Array.isArray(hours)) {
      const hoursAvaliable: HourAvaliableConsultation[] = hours.filter(it => it.available);

      const dataHours: DatasList[] = hoursAvaliable.map(it => {
        const splitHour = it.hour_consultation.split(":");
        const hourFormatted: string = `${splitHour[0]}:${splitHour[1]}`;

        return {
          id: it.id,
          value: hourFormatted
        }
      })

      this.dataHourAvaliable.set({
        emptyMessage: this.emptyMessageHour,
        dataList: dataHours
      });
      return;
    }

    desactiveScroll(false, this.renderer);
    await this.serviceValide.valideResponse(hours, "Busca de horários disponíveis")
  }

  async getDoctorsBySpeciality(specialityId: number) {
    const doctors: DoctorSpeciality[] | unknown = await this.serviceDoctor.getDoctorsBySpeciality(specialityId);

    if (Array.isArray(doctors)) {
      this.getDoctorFormatter(doctors);
      return;
    }

    desactiveScroll(false, this.renderer);
    await this.serviceValide.valideResponse(doctors, "Busca de Doutores(as) por Especialidades")
  }

  async getHourAvaliable(): Promise<void> {
    const doctorId = this.profileForm.get('doctorId')?.value;
    const date = this.profileForm.get('date')?.value;

    if (doctorId == null || date == null || doctorId == "" || date == "") {
      return;
    }

    const hours: HourAvaliableConsultation[] | unknown = await this.serviceConsultation.getHoursAvaliableConsultation(date, Number(doctorId));

    this.getHoursFormatter(hours);
  }
}
