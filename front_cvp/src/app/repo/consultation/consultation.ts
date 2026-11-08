import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Token } from '../token/token';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { ReturnMessageCreateElement } from '../dto-response-standart/interface-response';

export interface WriteConsultationStatus {
    new_status: string
}

export interface ConsultationAccess {
    id: number
    patient_name: string
    doctor_name: string
    hour: string
    speciality_name: string
    status: string
    cpf: string
    phone: string
    consultation_date: string
}

export interface ConsultationPreview {
    id: number
    patient_name: string
    doctor_name: string
    hour: string
    speciality_name: string
    status: string
}

export interface ConsultationResponsePreview {
    hour: string
    consultations: ConsultationPreview[]
}

export interface ConsultationWrite {
    medical_record_id: number
    patient_id: number
    doctor_id: number
    speciality_id: number
    recepcionist_id: number
    consultation_date: string
    hour: string
}

export interface HourAvaliableConsultation {
    id: number
    hour_consultation: string
    available: boolean
}

export interface ResumeConsultations {
    scheduled: number
    waiting: number
    in_progress: number
    completed: number
    canceled: number
    total: number
}

@Injectable({
    providedIn: 'root'
})
export class Consultation {
    private readonly http = inject(HttpClient);
    private readonly token = inject(Token);
    private readonly baseUrl = `${environment.baseUrlApi}/consultation`;

    async getConsultationPreview(date: string): Promise<ConsultationResponsePreview[] | unknown> {
        try {
            return await firstValueFrom(this.http.get<ConsultationResponsePreview[]>(`${this.baseUrl}/preview?date=${date}`, { headers: this.token.getAuthHeaders() }));

        } catch (error) {
            return error;
        }
    }

    async getConsultationById(id: number): Promise<ConsultationAccess | HttpErrorResponse | false> {
        try {
            return await firstValueFrom(this.http.get<ConsultationAccess>(`${this.baseUrl}/${id}/access`, { headers: this.token.getAuthHeaders() }))

        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return error;
            }

            return false;
        }
    }

    async postConsultation(consultation: ConsultationWrite): Promise<ReturnMessageCreateElement | unknown> {
        try {
            return await firstValueFrom(this.http.post<ReturnMessageCreateElement>(this.baseUrl, consultation, { headers: this.token.getAuthHeaders() }))

        } catch (error) {
            return error;
        }
    }

    async patchStatusConsultation(id: number, newStatus: WriteConsultationStatus): Promise<HttpErrorResponse | boolean> {
        try {
            const response = await firstValueFrom(this.http.patch(`${this.baseUrl}/${id}`, newStatus, { observe: 'response', headers: this.token.getAuthHeaders() }))

            if (response.status == HttpStatusCode.Ok) {
                return true;
            }

            return false;
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return error;
            }

            return false;
        }
    }

    async getHoursAvaliableConsultation(verifyDate: string, doctorId: number): Promise<HourAvaliableConsultation[] | unknown> {
        try {
            return await firstValueFrom(this.http.get<HourAvaliableConsultation>(`${this.baseUrl}/hour_available/${doctorId}/${verifyDate}`, { headers: this.token.getAuthHeaders() }));

        } catch (error) {
            return error;
        }
    }

    async getCountConsultations(date: string): Promise<ResumeConsultations | HttpErrorResponse | false> {
        try {
            return await firstValueFrom(this.http.get<ResumeConsultations>(`${this.baseUrl}/resume_consultations?date=${date}`, { headers: this.token.getAuthHeaders() }));

        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return error;
            }

            return false;
        }
    }
}
