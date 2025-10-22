import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { AuthRequest } from '../../../core/requests/auth/auth-requests';
import { CommonModule } from '@angular/common';
import { LoginForm } from './login.form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { API_ACTIONS } from '../../../constants/api-actions';
import { catchError, of, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarError, snackBarInfo } from '../../../core/utils/snack-bar.util';


@Component({
  selector: 'emec-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new LoginForm();
  currentYear: number = new Date().getFullYear();
  router = inject(Router);
  authService = inject(AuthService);
    matSnackBar = inject(MatSnackBar);

  onSubmit(): void {
    if (this.loginForm.formGroup.valid) {
      const { username, password } = this.loginForm.formGroup.value;
      const request: AuthRequest = {
        action: API_ACTIONS.AUTHENTICATE,
        attributes: {
          userName: username,
          password: password,
        },
      };
      // this.authService.auth(request).subscribe({
      //   next: (response) => {
      //     // Handle successful login (e.g., store token, redirect)
      //     this.router.navigate(['/workshop/dashboard']);
      //   },
      //   error: (err) => {
      //     // Handle error (e.g., show error message)
      //     alert('Login failed. Please check your credentials.');
      //   }
      // });

      this.authService.auth(request).pipe(
        take(1),
        tap((authResponse) => {
          if (authResponse.isSuccess) {
            if (!authResponse.result.accessToken || !authResponse.result.refreshToken) {
              snackBarInfo(this.matSnackBar, 'Login failed. Missing authentication tokens.');
              return;
            }
                // Store tokens in localStorage
                localStorage.setItem('access_token', authResponse.result.accessToken);
                localStorage.setItem('refresh_token', authResponse.result.refreshToken);
            this.router.navigate(['/workshop/dashboard']);
          } else {
            snackBarError(this.matSnackBar, authResponse.error.message);
          }
        }),
        catchError((error) => {
          snackBarError(this.matSnackBar, 'Unexpected error occurred. Please try again later.');
          return of(null);
        })
      ).subscribe();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onForgotPassword(): void {
    alert('Redirecting to Forgot Password...');
    // Implement routing or modal
  }
}
