import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Token {

    getAuthHeaders(): HttpHeaders {
        //const token1 = localStorage.getItem('token');

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzkzNzI5NjY3LCJleHAiOjE3OTM3NDQwNjd9.Vu99rzwS-l74kRqzLQ0LTn1HwFBQ22ZqPWUk92Xozy8';

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

}
