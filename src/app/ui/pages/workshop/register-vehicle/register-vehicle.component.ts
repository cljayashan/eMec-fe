// ...existing imports and @Component...
// Remove duplicate class, keep only the one below
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { createRegisterVehiclePayload } from '../../../../core/requests/workshop/register-vehicle.req';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { firstValueFrom } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatOption } from '@angular/material/autocomplete';
import { RegisterVehicleForm } from './register-vehicle.form';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  snackBarError,
  snackBarSuccess,
} from '../../../../core/utils/snack-bar.util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-vehicle',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './register-vehicle.component.html',
  styleUrl: './register-vehicle.component.scss',
})
export class RegisterVehicleComponent extends RegisterVehicleForm {
  matSnackBar = inject(MatSnackBar);

  displayOwner = (key: string | null) => {
    if (!key) return '';
    const found = this.ownerNames.find(
      (owner: { key: string; value: string }) => owner.key === key
    );
    return found ? found.value : '';
  };
  years: number[] = [];
  private vehicleService: VehicleService = inject(
    VehicleService
  ) as VehicleService;

  // Autocomplete data and logic
  ownerNames: { key: string; value: string }[] = [
    { key: '89E50A85-5C83-4354-80CE-EB7B2625CEE1', value: 'John Doe' },
    { key: 'A1B2C3D4-E5F6-7890-1234-56789ABCDEFA', value: 'Jane Smith' },
    { key: 'B2C3D4E5-F6A1-2345-6789-ABCDEFA12345', value: 'Michael Johnson' },
    { key: 'C3D4E5F6-A1B2-3456-7890-ABCDEFA23456', value: 'Emily Davis' },
    { key: 'D4E5F6A1-B2C3-4567-8901-ABCDEFA34567', value: 'Chris Lee' },
    { key: 'E5F6A1B2-C3D4-5678-9012-ABCDEFA45678', value: 'Sarah Brown' },
    { key: 'F6A1B2C3-D4E5-6789-0123-ABCDEFA56789', value: 'David Wilson' },
    { key: 'A1B2C3D4-E5F6-7890-1234-ABCDEFA67890', value: 'Anna White' },
    { key: 'B2C3D4E5-F6A1-2345-6789-ABCDEFA78901', value: 'James Miller' },
    { key: 'C3D4E5F6-A1B2-3456-7890-ABCDEFA89012', value: 'Olivia Taylor' },
  ];
  filteredOwnerNames: { key: string; value: string }[] = this.ownerNames;

  constructor() {
    super();
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1980; year--) {
      this.years.push(year);
    }
  }

  async submitVehicle() {
    if (this.registerVehicleFormGroup.invalid) {
      this.registerVehicleFormGroup.markAllAsTouched();
      snackBarError(
        this.matSnackBar,
        'Required fields are missing or invalid.'
      );
      return;
    }

    const payload = createRegisterVehiclePayload(
      this.registerVehicleFormGroup.value
    );

    try {
      const response = await firstValueFrom(
        this.vehicleService.registerVehicle(payload)
      );
      if (response && response.isSuccess) {
        snackBarSuccess(this.matSnackBar, 'Vehicle registered successfully.');
        this.resetForm();
      } else {
        snackBarError(this.matSnackBar, response.error?.message);
      }
    } catch (error: any) {
      snackBarError(
        this.matSnackBar,
        'An error occurred while registering the vehicle.'
      );
    }
  }

  filterOwnerNames(value: string | null) {
    if (!value) {
      this.filteredOwnerNames = this.ownerNames;
      return;
    }
    const filterValue = value.toLowerCase();
    this.filteredOwnerNames = this.ownerNames.filter((owner) =>
      owner.value.toLowerCase().includes(filterValue)
    );
  }

  resetForm() {
    Object.keys(this.registerVehicleFormGroup.controls).forEach(key => {
      const control = this.registerVehicleFormGroup.get(key);
      control?.reset();
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
    this.filteredOwnerNames = this.ownerNames;
  }

  async callTestApi(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.vehicleService.testVehicle().pipe(
          tap((res) => console.log('API response:', res)),
          catchError((err) => {
            console.error('API error:', err);
            throw err;
          })
        )
      );
      // You can use response here if needed
    } catch (error) {
      // Error already logged in catchError
    }
  }

  setYear(event: any, picker: any) {
    if (event && event.getFullYear) {
      const yomControl = this.registerVehicleFormGroup.get('yom');
      yomControl?.setValue(event.getFullYear());
      yomControl?.markAsTouched();
      yomControl?.updateValueAndValidity();
      picker.close();
    }
  }
}
