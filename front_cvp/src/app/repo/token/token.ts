import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Token {

    getAuthHeaders(): HttpHeaders {
        //const token1 = localStorage.getItem('token');

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzkzNjU2MjUzLCJleHAiOjE3OTM2NzA2NTN9.8qBVGxJ5tglRGcGGW0jaJ0w93_1dUX5eKOO_DB5bLKU';

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

}
