import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Token } from '../token/token';
import { environment } from '../../../environments/environment';

export interface PatientPreview {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    photo: string;
    medical_record_id: number;
}

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
    weight: number;
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

    urlBase: string = `${environment.baseUrlApi}/patient`;

    async postPatient(patient: PatientRegister): Promise<PatientResponse | unknown> {
        try {
            const response: PatientResponse = await firstValueFrom(this.http.post<PatientResponse>(this.urlBase, patient, { headers: this.headers.getAuthHeaders() }));
            return response;

        } catch (error) {
            return error;
        }
    }

    async getPatientsPreview(): Promise<PatientPreview[] | unknown> {
        try {
            return await firstValueFrom(this.http.get<PatientPreview[]>(this.urlBase, { headers: this.headers.getAuthHeaders() }));
        } catch (error) {
            return error;
        }
    }

    async getPatient(id: number): Promise<PatientResponse | HttpErrorResponse | false > {
        try {
            return await firstValueFrom(this.http.get<PatientResponse>(`${this.urlBase}/${id}`, { headers: this.headers.getAuthHeaders() }));
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return error;
            }

            return false;
        }
    }
}
