import { Customer } from './customer.model';
import { Product } from './product.model';

export interface ProductItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product?: Product; // Optionnel car il vient d'un autre service (Transient)
}

export interface Bill {
  id: number;
  billingDate: string | Date;
  customerId: number;
  productItems: ProductItem[];
  customer?: Customer; // Optionnel car il vient d'un autre service (Transient)
}
