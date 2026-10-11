import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLocaleLowerCase();
    if (!term) {
      return this.products;
    }

    return this.products.filter(product =>
      `${product.id} ${product.name}`.toLocaleLowerCase().includes(term)
    );
  }

  get totalUnits(): number {
    return this.products.reduce((total, product) => total + product.quantity, 0);
  }

  updateSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: err => {
        console.error('Erreur lors du chargement des produits', err);
        this.errorMessage = 'Les produits ne peuvent pas être chargés pour le moment.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }
}
