import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    //console.log('[AuthInterceptor] Intercepting request:', req.url);
    if (accessToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      //console.log('[AuthInterceptor] Added Authorization header:', cloned.headers.get('Authorization'));
      return next.handle(cloned);
    }
    //console.log('[AuthInterceptor] No access token found, sending request without Authorization header.');
    return next.handle(req);
  }
}
