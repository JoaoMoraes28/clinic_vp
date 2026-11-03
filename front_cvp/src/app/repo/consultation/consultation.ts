import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Token } from '../token/token';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { ReturnMessageCreateElement } from '../dto-response-standart/interface-response';

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

@Injectable({
    providedIn: 'root'
})
export class Consultation {
    private readonly http = inject(HttpClient);
    private readonly token = inject(Token);
    private readonly baseUrl = `${environment.baseUrlApi}/consultation`;

    async getHoursAvaliableConsultation(verifyDate: string, doctorId: number): Promise<HourAvaliableConsultation[] | unknown> {
        try {
            return await firstValueFrom(this.http.get<HourAvaliableConsultation>(`${this.baseUrl}/hour_available/${doctorId}/${verifyDate}`, { headers: this.token.getAuthHeaders() }));

        } catch (error) {
            return error;
        }
    }

    async postConsultation(consultation: ConsultationWrite): Promise<ReturnMessageCreateElement | unknown> {
        try {
            return await firstValueFrom(this.http.post<ReturnMessageCreateElement>(this.baseUrl, consultation, { headers: this.token.getAuthHeaders() }))

        } catch (error) {
            return error;
        }
    }
}
