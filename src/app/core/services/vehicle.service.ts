import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'https://localhost:5000/api/vehicle/test';

  constructor(private http: HttpClient) {}

  testVehicle(): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }
}
