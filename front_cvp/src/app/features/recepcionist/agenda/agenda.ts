import { Component } from '@angular/core';
import { CalendaryIcon } from '../../../svg/calendary-icon/calendary-icon';
import { getDateFormatted, date } from '../../../utils/date/date';
import { BadgesConsultation } from './components/badges-consultation/badges-consultation';
import { ConsultationsTable } from './components/consultations-table/consultations-table';
import { Arrow } from '../../../svg/arrow/arrow';

export interface CountConsultationStatus {
  scheduled: number;
  waiting: number;
  in_progress: number;
  completed: number;
  canceled: number;
  total: number;
}

export interface Badge {
  text: string;
  colorBadge: string;
  colorText: string;
  quantity: number;
}

export interface Consultation {
  id: number;
  patient_name: string;
  doctor_name: string;
  hour: string;
  speciality_name: string;
  status: string;
}

export interface ConsultationsData {
  hour: string;
  consultations: Consultation[];
}

@Component({
  imports: [CalendaryIcon, BadgesConsultation, ConsultationsTable, Arrow],
  selector: 'app-agenda',
  templateUrl: './agenda.html',
})
export class Agenda {
  stausConsultations: CountConsultationStatus = {
    scheduled: 12,
    canceled: 2,
    completed: 6,
    in_progress: 7,
    waiting: 9,
    total: 26
  }

  consultationsData: ConsultationsData[] = [
    {
      hour: "08:00:00",
      consultations: [
        {
          id: 4,
          patient_name: "Carla oliveira",
          doctor_name: "Dr Caio Costa",
          hour: "08:00:00",
          speciality_name: "Urologista",
          status: "COMPLETED"
        },
        {
          id: 3,
          patient_name: "Marcos Henrique Oliveira",
          doctor_name: "Dra. Amanda Silva",
          hour: "08:00:00",
          speciality_name: "Neurologista",
          status: "WAITING"
        },
        {
          id: 5,
          patient_name: "Carla oliveira",
          doctor_name: "Dra. Amanda Silva",
          hour: "08:30:00",
          speciality_name: "Ginecologista",
          status: "WAITING"
        }
      ]
    },
    {
      hour: "09:00:00",
      consultations: [
        {
          id: 6,
          patient_name: "Carla oliveira",
          doctor_name: "Dra. Amanda Silva",
          hour: "09:30:00",
          speciality_name: "Ginecologista",
          status: "CANCELED"
        },
        {
          id: 7,
          patient_name: "Carla oliveira",
          doctor_name: "Dra. Amanda Silva",
          hour: "09:45:00",
          speciality_name: "Ginecologista",
          status: "SCHEDULED"
        }
      ]
    },
    {
      hour: "10:00:00",
      consultations: [
        {
          id: 9,
          patient_name: "Carla oliveira",
          doctor_name: "Dra. Amanda Silva",
          hour: "10:00:00",
          speciality_name: "Ginecologista",
          status: "SCHEDULED"
        },
        {
          id: 8,
          patient_name: "Carla oliveira",
          doctor_name: "Dra. Amanda Silva",
          hour: "10:45:00",
          speciality_name: "Ginecologista",
          status: "SCHEDULED"
        }
      ]
    },
    {
      hour: "11:00:00",
      consultations: []
    },
    {
      hour: "12:00:00",
      consultations: []
    },
    {
      hour: "13:00:00",
      consultations: []
    },
    {
      hour: "14:00:00",
      consultations: []
    },
    {
      hour: "15:00:00",
      consultations: []
    },
    {
      hour: "16:00:00",
      consultations: []
    },
    {
      hour: "17:00:00",
      consultations: []
    },
    {
      hour: "18:00:00",
      consultations: []
    }
  ];

  badges: Badge[] = [
    {
      text: 'Agendadas',
      colorBadge: 'var(--blue-dark)',
      colorText: 'var(--white-default)',
      quantity: this.stausConsultations.scheduled
    },
    {
      text: 'Em espera',
      colorBadge: 'var(--blue-cian)',
      colorText: 'var(--white-default)',
      quantity: this.stausConsultations.waiting
    },
    {
      text: 'Canceladas',
      colorBadge: 'var(--red-light)',
      colorText: 'var(--black-default)',
      quantity: this.stausConsultations.canceled
    },
    {
      text: 'Concluídas',
      colorBadge: 'var(--green-default) ',
      colorText: 'var(--blue-dark)',
      quantity: this.stausConsultations.completed
    }
  ];

  todayFormatted: string = getDateFormatted(date);
}
