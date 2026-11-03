import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Token } from '../token/token';
import { environment } from '../../../environments/environment';

export interface Uf {
    id: number,
    abbreviation: string
}

@Injectable({
    providedIn: 'root',
})
export class Uf {
    private http = inject(HttpClient);
    private serviceToken = inject(Token);

    async getUf(): Promise<Uf[] | unknown> {
        try {
            const url = `${environment.baseUrlApi}/uf`;

            const response: Uf[] = await firstValueFrom(this.http.get<Uf[]>(url, { headers: this.serviceToken.getAuthHeaders() }));

            return response;

        } catch (error) {
            return error;
        }
    }
}