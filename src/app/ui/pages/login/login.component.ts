import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from './login.form';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new LoginForm();
  currentYear: number = new Date().getFullYear();
  router = inject(Router);

  onSubmit(): void {
    if (this.loginForm.formGroup.valid) {
      const { username, password } = this.loginForm.formGroup.value;
      console.log('Login submitted:', { username, password });
      // Add your login logic here
      this.router.navigate(['/workshop']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onForgotPassword(): void {
    alert('Redirecting to Forgot Password...');
    // Implement routing or modal
  }
}