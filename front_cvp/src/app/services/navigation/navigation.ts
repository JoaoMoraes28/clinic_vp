import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Consultation } from '../../svg/consultation/consultation';
import { ScheduleConsultation } from '../../svg/schedule-consultation/schedule-consultation';
import { Patients } from '../../svg/patients/patients';
import { RegistrationPatient } from '../../svg/registration-patient/registration-patient';

export interface NavBarIconData {
    label: string;
    component: Type<any>;
    href: string;
}

@Injectable({
    providedIn: 'root'
})
export class Navigation {
    private activeIcon = new BehaviorSubject<string>('Consultas');

    private navBarIcons: NavBarIconData[] = [
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
    ];

    getIconsNavBar(): NavBarIconData[] {
        return this.navBarIcons
    }

    setActiveIcon(newIcon: string): void {
        this.activeIcon.next(newIcon);
    }

    getActiveIcon(): Observable<string> {
        return this.activeIcon.asObservable();
    }
}
