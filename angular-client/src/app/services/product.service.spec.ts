import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch the HAL product collection through the gateway API route', () => {
    const products: Product[] = [{ id: 1, name: 'Thé', price: 35, quantity: 12 }];
    let result: Product[] | undefined;

    service.getProducts().subscribe(data => result = data);
    const request = httpTestingController.expectOne(
      '/enventory-service/api/products'
    );

    expect(request.request.method).toBe('GET');
    request.flush({ _embedded: { products } });
    expect(result).toEqual(products);
  });
});
