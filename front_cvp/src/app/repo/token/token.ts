import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Token {

    getAuthHeaders(): HttpHeaders {
        const token1 = localStorage.getItem('token');

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzkyMzYxMzIxLCJleHAiOjE3OTIzNjMxMjF9.rcy06YF_PdqwgIoFGK52OdsvX8cMC3olSehJW8faC0g';

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

}
