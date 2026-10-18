import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../token/token';

export interface PatientResponseData {
    id: number;
    name: string;
    professional: string;
    cpf: string;
    gender: string;
    phone: string;
    email: string;
    civil_state: string;
    photo: string;
    blood_type: string;
    weight: string;
    height: number;
    born_date: string;
    phone_emergency: string;
    notes: string;
    record_date: string;
    active: boolean;
    medical_record_id: number;
}

export interface AddressResponseData {
    city: string;
    district: string;
    street: string;
    number: string;
    cep: string;
    uf_address: string;
}

export interface PatientResponse {
    patient: PatientResponseData;
    address: AddressResponseData;
}

export interface PatientRegisterData {
    name: string;
    professional: string | null;
    cpf: string;
    gender: string;
    phone: string;
    email: string | null;
    civil_state: string;
    photo: string | null;
    blood_type: string | null;
    weight: number | null;
    height: number | null;
    born_date: string;
    phone_emergency: string | null;
    notes: string | null;
}

export interface AddressRegisterData {
    city: string;
    district: string;
    street: string;
    number: string;
    cep: string;
    uf_id: number;
}

export interface PatientRegister {
    patient: PatientRegisterData;
    address: AddressRegisterData;
}

@Injectable({
    providedIn: 'root'
})
export class Patient {
    private http = inject(HttpClient);
    private headers = inject(Token);

    urlBase: string = 'https://clinic-vp.onrender.com/clinic_vp/patient/'
;
    postPatient(patient: PatientRegister): Observable<PatientResponse> {
        return this.http.post<PatientResponse>(this.urlBase, patient, { headers: this.headers.getAuthHeaders() });
    }
}
