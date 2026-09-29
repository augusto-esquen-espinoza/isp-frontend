import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateCustomerRequest,
  Customer,
  CustomerFilters,
  IndicatorResponse,
} from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly customersUrl = `${environment.apiUrl}/customers`;
  private readonly indicatorsUrl = `${environment.apiUrl}/indicators`;

  create(request: CreateCustomerRequest): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, request);
  }

  findAll(filters: CustomerFilters = {}): Observable<Customer[]> {
    let params = new HttpParams();
    if (filters.dni) {
      params = params.set('dni', filters.dni);
    }
    if (filters.email) {
      params = params.set('email', filters.email);
    }
    return this.http.get<Customer[]>(this.customersUrl, { params });
  }

  getIndicators(): Observable<IndicatorResponse> {
    return this.http.get<IndicatorResponse>(this.indicatorsUrl);
  }
}
