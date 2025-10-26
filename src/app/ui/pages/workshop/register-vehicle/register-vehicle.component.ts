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
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { firstValueFrom } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatOption } from '@angular/material/autocomplete';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
export class RegisterVehicleComponent {
  years: number[] = [];
  private vehicleService: VehicleService = inject(
    VehicleService
  ) as VehicleService;

  // Autocomplete data and logic
  ownerNames: string[] = [
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
    'Emily Davis',
    'Chris Lee',
    'Sarah Brown',
    'David Wilson',
    'Anna White',
    'James Miller',
    'Olivia Taylor'
  ];
  filteredOwnerNames: string[] = this.ownerNames;
  vehicleOwnerControl = new FormControl('');

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1980; year--) {
      this.years.push(year);
    }

    this.vehicleOwnerControl.valueChanges.subscribe(value => {
      this.filterOwnerNames(value);
    });
  }

  vehicleForm = new FormGroup({
    vehicleType: new FormControl(''),
    id: new FormControl(''),
    province: new FormControl(''),
    prefix: new FormControl(''),
    number: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    version: new FormControl(''),
    yom: new FormControl('', Validators.required),
    yor: new FormControl(''),
    vehicleOwner: this.vehicleOwnerControl
    ,remark: new FormControl('')
  });

  filterOwnerNames(value: string | null) {
    if (!value) {
      this.filteredOwnerNames = this.ownerNames;
      return;
    }
    const filterValue = value.toLowerCase();
    this.filteredOwnerNames = this.ownerNames.filter(name =>
      name.toLowerCase().includes(filterValue)
    );
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
      const yomControl = this.vehicleForm.get('yom');
      yomControl?.setValue(event.getFullYear());
      yomControl?.markAsTouched();
      yomControl?.updateValueAndValidity();
      picker.close();
    }
  }
}

// creating ui for register vehicle