import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { createSearchCustomerPayload } from '../requests/common/search-customer-names.req';

export interface CustomerName {
  id: string;
  name: string;
}

export interface CustomerNamesSearchResponse {
  isSuccess: boolean;
  result: CustomerName[] | null;
  error: {
    message: string;
    code?: string;
  } | null;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private searchUrl = `${environment.baseUrl}/customer/search`;

  constructor(private http: HttpClient) {}

  searchCustomers(name?: string): Observable<CustomerNamesSearchResponse> {
    const payload = createSearchCustomerPayload(name);
    return this.http.post<CustomerNamesSearchResponse>(this.searchUrl, payload);
  }
}
