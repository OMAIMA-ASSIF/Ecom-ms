import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Customer } from '../models/customer.model';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch the HAL customer collection through the gateway API route', () => {
    const customers: Customer[] = [{ id: 1, name: 'Samira', email: 'samira@example.com' }];
    let result: Customer[] | undefined;

    service.getCustomers().subscribe(data => result = data);
    const request = httpTestingController.expectOne(
      '/customer-service/api/customers'
    );

    expect(request.request.method).toBe('GET');
    request.flush({ _embedded: { customers } });
    expect(result).toEqual(customers);
  });
});
