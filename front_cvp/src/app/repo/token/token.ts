import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Token {

    getAuthHeaders(): HttpHeaders {
        //const token1 = localStorage.getItem('token');

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzkyOTYxMTcwLCJleHAiOjE3OTI5NjI5NzB9.Ccqx4OagMcpM7QVXOEv3QeXM8eiujk8Shand3-ZoHBI';

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

}
