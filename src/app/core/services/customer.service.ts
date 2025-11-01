import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchCustomerNamesAttributes } from '../requests/common/search-customer-names.req';
import { CustomerSearchResponse } from '../responses/response-wrapper.res';
import { RequestWrapper } from '../requests/request-wrapper.req';

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

  searchCustomers(request?: RequestWrapper<SearchCustomerNamesAttributes>): Observable<CustomerSearchResponse> {
    //const payload = createSearchCustomerPayload(request);
    return this.http.post<CustomerSearchResponse>(this.searchUrl, request);
  }
}
