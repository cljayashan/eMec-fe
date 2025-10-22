import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Define the expected response structure for testVehicle
export interface TestVehicleResponse {
  success?: boolean;
  message?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = `${environment.baseUrl}/vehicle/test`;

  constructor(private http: HttpClient) {}

  testVehicle(): Observable<TestVehicleResponse> {
    return this.http.post<TestVehicleResponse>(this.baseUrl, {});
  }
}
