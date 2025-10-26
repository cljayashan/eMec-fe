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
  private testUrl = `${environment.baseUrl}/vehicle/test`;
  private registerUrl = `${environment.baseUrl}/vehicle/register`;

  constructor(private http: HttpClient) {}

  testVehicle(): Observable<TestVehicleResponse> {
    return this.http.post<TestVehicleResponse>(this.testUrl, {});
  }

  registerVehicle(payload: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, payload);
  }
}
