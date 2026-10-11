import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';

  constructor(
    private customerService: CustomerService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  get filteredCustomers(): Customer[] {
    const term = this.searchTerm.trim().toLocaleLowerCase();
    if (!term) {
      return this.customers;
    }

    return this.customers.filter(customer =>
      `${customer.id} ${customer.name} ${customer.email}`.toLocaleLowerCase().includes(term)
    );
  }

  updateSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.customerService.getCustomers().subscribe({
      next: data => {
        this.customers = data;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: err => {
        console.error('Erreur lors du chargement des clients', err);
        this.errorMessage = 'Les clients ne peuvent pas être chargés pour le moment.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }
}
