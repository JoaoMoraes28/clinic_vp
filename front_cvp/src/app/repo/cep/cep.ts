import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AddressCep {
    cep: string
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

@Injectable({
    providedIn: 'root'
})
export class Cep {
    private http = inject(HttpClient);

    getAddressByCep(cep: string): Observable<AddressCep> {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        return this.http.get<AddressCep>(url);
    }

}
