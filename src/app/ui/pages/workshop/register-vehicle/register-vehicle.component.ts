import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { createRegisterVehiclePayload } from '../../../../core/requests/workshop/register-vehicle.req';
import { SearchCustomerResponse } from '../../../../core/responses/common/search-customer.res';
import { CustomerService } from '../../../../core/services/customer.service';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { RegisterVehicleForm } from './register-vehicle.form';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ACTIONS } from '../../../../constants/api-actions';
import { mapSearchCustomerResponseToOwnerNameVm } from '../../../../core/mappers/response-mappers/search-customer-response.mapper';
import { mapToSearchCustomerNamesRequest } from '../../../../core/mappers/search-customer-names-request.mapper';
import {
  snackBarError,
  snackBarSuccess,
} from '../../../../core/utils/snack-bar.util';
import { IOwnerNameListDropdownVm } from '../../../../core/vm/common/owner-name-list-dropdown.vm';

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
  standalone: true,
})
export class RegisterVehicleComponent extends RegisterVehicleForm {
  matSnackBar = inject(MatSnackBar);
  years: number[] = [];
  private vehicleService: VehicleService = inject(
    VehicleService
  ) as VehicleService;
  private customerService: CustomerService = inject(
    CustomerService
  ) as CustomerService;

  ownerNames: IOwnerNameListDropdownVm[] = [];

  filteredOwnerNames: IOwnerNameListDropdownVm[] = [];

  constructor() {
    super();
    this.setCurrentYear();
    this.loadCustomers();
  }

  setCurrentYear() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1980; year--) {
      this.years.push(year);
    }
  }

  displayOwner = (owner: IOwnerNameListDropdownVm | null) => {
    if (!owner) return '';
    return owner.FulName || '';
  };

  async loadCustomers(searchKey: string = ''): Promise<void> {
    const attributes = { FName: searchKey };
    const wrappedRequest = mapToSearchCustomerNamesRequest(
      attributes,
      API_ACTIONS.LIST,
      ['dropdowndata']
    );

    await this.customerService
      .searchCustomers(wrappedRequest)
      .pipe(
        take(1),
        tap((response: SearchCustomerResponse) => {
          if (response && response.isSuccess && response.result) {
            const ownerDropdownList = mapSearchCustomerResponseToOwnerNameVm(
              response.result
            );
            this.filteredOwnerNames = ownerDropdownList;
          } else {
            snackBarError(
              this.matSnackBar,
              response.error?.message || 'Failed to load customers.'
            );
          }
        }),
        catchError((err: any) => {
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
    this.filteredOwnerNames = this.ownerNames.filter(
      (owner: IOwnerNameListDropdownVm) =>
        owner.FulName?.toLowerCase().includes(filterValue)
    );
  }

  resetForm() {
    Object.keys(this.registerVehicleFormGroup.controls).forEach((key) => {
      const frmGroup = this.registerVehicleFormGroup.get(key);
      frmGroup?.reset();
      frmGroup?.setErrors(null);
      frmGroup?.markAsUntouched();
      frmGroup?.markAsPristine();
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
