import { HttpClient } from '@angular/common/http';
import { Token } from '../token/token';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

export interface SpecialityResponse {
    id: number;
    speciality_name: string;
}


@Injectable({
    providedIn: 'root'
})
export class Speciality {
    private http = inject(HttpClient);
    private serviceToken = inject(Token);
    private readonly baseUrl = `${environment.baseUrlApi}/speciality`;

    async getSpeciality(): Promise<SpecialityResponse | unknown> {
        try {
            return await firstValueFrom(this.http.get<Speciality[]>(this.baseUrl, { headers: this.serviceToken.getAuthHeaders() }));

        } catch (error) {
            return error;
        }
    }
}
