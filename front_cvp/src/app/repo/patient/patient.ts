import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Token } from '../token/token';
import { environment } from '../../../environments/environment';
import { ModalResponse } from '../../services/modal-response/modal-response';

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
    private readonly serviceModalResponse = inject(ModalResponse);

    urlBase: string = `${environment.baseUrlApi}/patient`;

    async postPatient(patient: PatientRegister): Promise<PatientResponse | false> {
        try {
            const response: PatientResponse = await firstValueFrom(this.http.post<PatientResponse>(this.urlBase, patient, { headers: this.headers.getAuthHeaders() }));
            return response;

        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status == 403) {
                    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Paciente", "Você não possui permissão para realziar esta função!", "Retornar", '');

                } else if (error.status == 401) {
                    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Paciente", "Seu token de acesso pode ter expirado!", "Autenticar", 'auth');

                } else if (error.status == 400) {
                    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Paciente", `Informações inválidas! (${error.error.field})`, "Tentar novamente", null);

                } else {
                    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Paciente", "Ocorreu um erro ao tentar cadatrar este paciente!", "Tentar novamente", null);
                }
            }

            return false;
        }
    }

    async getPatient(): Promise<PatientResponse[]> {
        const response: PatientResponse[] = await firstValueFrom(this.http.get<PatientResponse[]>(this.urlBase, { headers: this.headers.getAuthHeaders() }));
        return response;
    }
}
