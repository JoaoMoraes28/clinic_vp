import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    getUf(): Observable<Uf[]> {
        const url = 'https://clinic-vp.onrender.com/clinic_vp/uf'

        return this.http.get<Uf[]>(url, { headers: this.serviceToken.getAuthHeaders() });
    }
}
