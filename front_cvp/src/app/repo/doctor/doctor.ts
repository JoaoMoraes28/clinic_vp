import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Token } from '../token/token';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface DoctorSpeciality {
    doctor_id: number
    name: string
    specialities: SpecialityJson[] 
}

interface SpecialityJson {
    id: number
    name: string
}

export interface DoctorData {
    doctor: DoctorBase;
    address: Address;
}

export interface DoctorBase {
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

@Injectable({
    providedIn: 'root'
})
export class Doctor {
    private readonly baseUrl = `${environment.baseUrlApi}`;
    private readonly token = inject(Token);
    private readonly http = inject(HttpClient);

    async getDoctors(): Promise<DoctorData[] | unknown> {
        try {
            return await firstValueFrom(this.http.get<DoctorData[]>(`${this.baseUrl}/doctor`, { headers: this.token.getAuthHeaders() }));

        } catch (error) {
            return error;
        }
    }

    async getDoctorsBySpeciality(speciality: number): Promise<DoctorSpeciality[] | unknown> {
        try {
            return await firstValueFrom(this.http.get<DoctorSpeciality[]>(`${this.baseUrl}/doctor_speciality?filter_speciality=${speciality}`, { headers: this.token.getAuthHeaders() }))

        } catch (error) {
            return error;
        }
    }
}
