import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Token {

    getAuthHeaders(): HttpHeaders {
        //const token1 = localStorage.getItem('token');

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzkzMDI1ODQ0LCJleHAiOjE3OTMwNDAyNDR9.4tXVC2NMaK-KhEEgMKTHkgWnWcsXr9gfRI-gvrqIKd8';

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

}
