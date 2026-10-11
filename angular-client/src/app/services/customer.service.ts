import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl = `${environment.gatewayUrl}/customer-service/api/customers`;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<{ _embedded?: { customers?: Customer[] } }>(this.apiUrl).pipe(
      map(response => response._embedded?.customers ?? [])
    );
  }
}
