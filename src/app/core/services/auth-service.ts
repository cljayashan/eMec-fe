import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest } from '../requests/auth/auth-requests';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = 'https://localhost:5000/api';

    constructor(private http: HttpClient) {}

    auth(request: AuthRequest): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/auth`, request);
    }

    refreshToken(token: { refreshToken: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}/auth/refresh-token`, token);
    }
}