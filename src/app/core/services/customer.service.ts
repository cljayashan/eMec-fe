import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { createSearchCustomerPayload } from '../requests/common/search-customer-names.req';
import { CustomerSearchResponse } from '../responses/base.res';

export interface CustomerName {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private searchUrl = `${environment.baseUrl}/customer/search`;

  constructor(private http: HttpClient) {}

  searchCustomers(name?: string): Observable<CustomerSearchResponse> {
    const payload = createSearchCustomerPayload(name);
    return this.http.post<CustomerSearchResponse>(this.searchUrl, payload);
  }
}
