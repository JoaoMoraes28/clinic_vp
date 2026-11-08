import { inject, Injectable, OnInit, Type } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Consultation } from '../../svg/consultation/consultation';
import { ScheduleConsultation } from '../../svg/schedule-consultation/schedule-consultation';
import { Patients } from '../../svg/patients/patients';
import { RegistrationPatient } from '../../svg/registration-patient/registration-patient';

export interface NavBarIconData {
    label: string;
    route: string;
    component: Type<any>;
    href: string;
}

@Injectable({
    providedIn: 'root'
})
export class Navigation {
    private activeIcon = new BehaviorSubject<string>('');

    private navBarIcons: NavBarIconData[] = [
        {
            label: 'Consultas',
            route: '/recepcionist/agenda',
            component: Consultation,
            href: '/recepcionist/agenda'
        },
        {
            label: 'Agendar consulta',
            route: '/recepcionist/patients/true',
            component: ScheduleConsultation,
            href: '/recepcionist/patients/true'
        },
        {
            label: 'Pacientes',
            route: '/recepcionist/patients/false',
            component: Patients,
            href: '/recepcionist/patients/false'
        },
        {
            label: 'Cadastro de paciente',
            route: '/recepcionist/register_patient',
            component: RegistrationPatient,
            href: '/recepcionist/register_patient'
        }
    ];

    getIconsNavBar(): NavBarIconData[] {
        return this.navBarIcons
    }

    setActiveIcon(newIcon: string): void {
        if (newIcon == 'Agendar consulta') {
            newIcon = "Pacientes";
        }
        this.activeIcon.next(newIcon);
    }

    getActiveIcon(): Observable<string> {
        return this.activeIcon.asObservable();
    }
}
