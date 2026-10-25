import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Token } from '../token/token';

export interface Uf {
    id: number,
    abbreviation: string
}

@Injectable({
    providedIn: 'root'
})
export class Uf {
    private http = inject(HttpClient);
    private serviceToken = inject(Token);

    async getUf(): Promise<Uf[]> {
        const url = 'http://localhost:3001/clinic_vp/uf'

        const response: Uf[] = await firstValueFrom(this.http.get<Uf[]>(url, { headers: this.serviceToken.getAuthHeaders() }));
        return response;
    }
}
