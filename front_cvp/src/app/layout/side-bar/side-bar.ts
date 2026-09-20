import { Component, inject, Type } from '@angular/core';
import { NavBarIcon } from './components/nav-bar-icon/nav-bar-icon';
import { Navigation } from '../../services/navigation/navigation';
import { Patients } from '../../svg/patients/patients';
import { Consultation } from '../../svg/consultation/consultation';
import { ScheduleConsultation } from '../../svg/schedule-consultation/schedule-consultation';
import { RegistrationPatient } from '../../svg/registration-patient/registration-patient';
import { ProfilePerson } from '../../svg/profile-person/profile-person';

export interface NavBarIconData {
  label: string;
  component: Type<any>;
  href: string;
}

@Component({
  imports: [NavBarIcon, ProfilePerson],
  selector: 'app-side-bar',
  templateUrl: './side-bar.html',
})
export class SideBar {
  private navigation = inject(Navigation);

  navBarIcons: NavBarIconData[] = [
    {
      label: 'Consultas',
      component: Consultation,
      href: '/recepcionist/agenda'
    },
    {
      label: 'Agendar consulta',
      component: ScheduleConsultation,
      href: '/recepcionist/schedule-consultation'
    },
    {
      label: 'Pacientes',
      component: Patients,
      href: '/recepcionist/patients'

    },
    {
      label: 'Cadastro de paciente',
      component: RegistrationPatient,
      href: '/recepcionist/registration-patient'
    }
  ]

  setIconClick(icon: string): void {
    this.navigation.setActiveIcon(icon)
  }
}
