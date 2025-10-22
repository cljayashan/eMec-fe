import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest } from '../requests/auth/auth-requests';
import { AuthResponse } from '../responses/auth-response';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    auth(request: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/auth/auth`, request);
    }

    refreshToken(request: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/auth/refresh-token`, request);
    }
}