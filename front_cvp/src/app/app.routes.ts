import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { Agenda } from './features/recepcionist/agenda/agenda';
import { Patients } from './features/recepcionist/patients/patients';
import { RegisterPatient } from './features/recepcionist/register-patient/register-patient';
import path from 'path';

export const routes: Routes = [
    {
        path: '',
        component: Login,
        title: 'Login'
    },
    {
        path: 'recepcionist',
        component: MainLayout,
        title: 'Clínica VP | Recepção',
        children: [
            {
                path: 'agenda',
                component: Agenda
            },
            {
                path: 'patients/:open-modal',
                component: Patients
            },
            {
                path: 'register_patient',
                component: RegisterPatient
            }
        ]
    },
    {
        path: '**',
        component: Login
    }
];
