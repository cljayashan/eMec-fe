import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { firstValueFrom } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register-vehicle',
  imports: [CommonModule],
  templateUrl: './register-vehicle.component.html',
  styleUrl: './register-vehicle.component.scss',
})
export class RegisterVehicleComponent {
  private vehicleService: VehicleService = inject(
    VehicleService
  ) as VehicleService;

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
}
