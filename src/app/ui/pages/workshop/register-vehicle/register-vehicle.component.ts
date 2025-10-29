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
import { CustomerNamesSearchResponse, CustomerService } from '../../../../core/services/customer.service';
import { firstValueFrom } from 'rxjs';
import { tap, catchError, take, debounce, debounceTime } from 'rxjs/operators';
import { MatOption } from '@angular/material/core';
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
  private customerService: CustomerService = inject(
    CustomerService
  ) as CustomerService;

  // Autocomplete data and logic
  ownerNames: { key: string; value: string }[] = [];
  filteredOwnerNames: { key: string; value: string }[] = [];

  constructor() {
    super();
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1980; year--) {
      this.years.push(year);
    }
    this.loadCustomers();
  }

  loadCustomers(searchKey: string = '') {
    //console.log('Loading customers with search key:', searchKey);
    this.customerService
      .searchCustomers(searchKey)
      .pipe(
        //debounceTime(10000), //TODO Check if this is needed
        take(1),
        tap((customerNames : CustomerNamesSearchResponse) => {
          console.log('API response:', customerNames);
          if (
            customerNames &&
            customerNames.isSuccess &&
            customerNames.result
          ) {
            this.ownerNames = customerNames.result.map((customer) => ({
              key: customer.id,
              value: customer.name,
            }));
            this.filteredOwnerNames = this.ownerNames;
          } else {
            snackBarError(this.matSnackBar, 'Failed to load customers.');
          }
        }),
        catchError((err) => {
          // console.error('API error:', err);
          snackBarError(
            this.matSnackBar,
            'An error occurred while loading customers.'
          );
          throw err;
        })
      )
      .subscribe();
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
    Object.keys(this.registerVehicleFormGroup.controls).forEach((key) => {
      const control = this.registerVehicleFormGroup.get(key);
      control?.reset();
      control?.setErrors(null);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
    this.filteredOwnerNames = this.ownerNames;
  }

  //Test method to call test API
  // async callTestApi(): Promise<void> {
  //   try {
  //     const response = await firstValueFrom(
  //       this.vehicleService.testVehicle().pipe(
  //         tap((res) => console.log('API response:', res)),
  //         catchError((err) => {
  //           console.error('API error:', err);
  //           throw err;
  //         })
  //       )
  //     );
  //     // You can use response here if needed
  //   } catch (error) {
  //     // Error already logged in catchError
  //   }
  // }
}
