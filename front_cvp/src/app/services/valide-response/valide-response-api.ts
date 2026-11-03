import { inject, Injectable } from '@angular/core';
import { ModalResponse } from '../modal-response/modal-response';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ValideResponseApi {
    private readonly serviceModalResponse = inject(ModalResponse);

    async valideResponse(response: unknown, title: string): Promise<boolean> {
        if (response instanceof HttpErrorResponse) {
            switch (response.status) {
                case 403: this.serviceModalResponse.constructorModalResponse(true, title, "Você não possui permissão para realizar esta ação!", "Retornar", ''); break;
                case 401: this.serviceModalResponse.constructorModalResponse(true, title, "Seu token de acesso pode ter expirado!", "Autenticar", 'auth'); break;
                case 400: this.serviceModalResponse.constructorModalResponse(true, title, "Informações inválidas!", "Tentar novamente", null); break;
                default: this.serviceModalResponse.constructorModalResponse(true, title, "Ocorreu um erro ao tentar realizar esta ação!", "Tentar novamente", null);
            }

            return false;
        }

        return true;
    }
}
