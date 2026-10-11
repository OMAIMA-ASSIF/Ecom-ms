import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  // Le chemin correspond au @RequestMapping("/api") de votre BillRestController
  private apiUrl = `${environment.gatewayUrl}/billing-service/api/bills`;

  constructor(private http: HttpClient) { }

  getBillById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }
}
