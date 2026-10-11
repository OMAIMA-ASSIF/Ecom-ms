import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers';
import { ProductsComponent} from './products/products';
import { BillsComponent} from './bills/bills';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'bills/:id', component: BillsComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
];
