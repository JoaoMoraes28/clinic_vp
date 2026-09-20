import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { Agenda } from './features/recepcionist/agenda/agenda';
import { Patients } from './features/recepcionist/patients/patients';

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
                path: 'patients',
                component: Patients
            }
        ]
    },
    {
        path: '**',
        component: Login
    }
];
