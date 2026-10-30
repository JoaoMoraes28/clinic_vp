import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Renderer2 } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Token } from '../token/token';
import { environment } from '../../../environments/environment';
import { ModalResponse } from '../../services/modal-response/modal-response';
import { desactiveScroll } from '../../utils/renderer-document';

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
    private readonly serviceModalResponse = inject(ModalResponse);

    async getUf(): Promise<Uf[] | false> {
        try {
            const url = `${environment.baseUrlApi}/uf`;

            const response: Uf[] = await firstValueFrom(this.http.get<Uf[]>(url, { headers: this.serviceToken.getAuthHeaders() }));

            return response;

        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                if (error.status == 403) {
                    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Paciente", "Você não possui permissão para realziar esta função!", "Retornar", '');

                } else if (error.status == 401) {
                    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Paciente", "Seu token de acesso pode ter expirado!", "Autenticar", 'auth');

                } else {
                    this.serviceModalResponse.constructorModalResponse(true, "Cadastro de Paciente", "Ocorreu um erro ao tentar cadatrar este paciente!", "Tentar novamente", null);
                }
            }

            return false;
        }
    }
}