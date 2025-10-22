import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  private router = inject(Router);
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    
    if (accessToken) {
      req = this.addToken(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/refresh-token')) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem('refresh_token');
      const username = localStorage.getItem('username');
      
      if (refreshToken && username) {
        const refreshRequest = {
          action: 'authenticate',
          attributes: {
            userName: username,
            refreshToken: refreshToken
          }
        };
        
        return this.authService.refreshToken(refreshRequest).pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;
            
            if (
              response.isSuccess &&
              response.result &&
              response.result.accessToken &&
              response.result.refreshToken
            ) {
              localStorage.setItem('access_token', response.result.accessToken);
              localStorage.setItem('refresh_token', response.result.refreshToken);
              this.refreshTokenSubject.next(response.result.accessToken);
              
              return next.handle(this.addToken(request, response.result.accessToken));
            }
            
            // If refresh failed, logout
            this.logout();
            return throwError(() => new Error('Token refresh failed'));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.logout();
            return throwError(() => err);
          })
        );
      } else {
        this.logout();
        return throwError(() => new Error('No refresh token or username available'));
      }
    } else {
      // Wait for the token refresh to complete
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }

  private logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
