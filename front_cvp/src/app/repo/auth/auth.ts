import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface CredentialsLogin {
    email: string;
    password: string;
}

export interface ResponseLogin {
    id: number;
    name: string;
    email: string;
    photo: string;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class Auth {
    private readonly baseUrl = `${environment.baseUrlApi}/auth`;
    private readonly http = inject(HttpClient);

    async postLogin(credentials: CredentialsLogin): Promise<ResponseLogin | HttpErrorResponse | false> {
        try {
            return await firstValueFrom(this.http.post<ResponseLogin>(`${this.baseUrl}/login`, credentials));

        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return error;
            }

            return false;
        }
    }

}
