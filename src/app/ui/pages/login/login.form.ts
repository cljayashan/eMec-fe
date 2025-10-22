import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LoginForm {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder = new FormBuilder()) {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  markAllAsTouched(): void {
    this.formGroup.markAllAsTouched();
  }
}