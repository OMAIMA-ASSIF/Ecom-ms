import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BillService } from '../services/bill.service';
import { Bill } from '../models/bill.model';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bills.html',
  styleUrl: './bills.css'
})
export class BillsComponent implements OnInit {
  bill: Bill | null = null;
  billId: number | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const rawId = params.get('id');
      if (rawId === null) {
        this.bill = null;
        this.isLoading = false;
        this.errorMessage = '';
        this.billId = null;
        return;
      }

      const id = Number(rawId);
      if (!Number.isInteger(id) || id < 1) {
        this.bill = null;
        this.isLoading = false;
        this.errorMessage = 'Veuillez saisir un numéro de facture valide.';
        return;
      }

      this.billId = id;
      this.loadBill(id);
    });
  }

  get billTotal(): number {
    return this.bill?.productItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ) ?? 0;
  }

  findBill(): void {
    const id = Number(this.billId);
    if (!Number.isInteger(id) || id < 1) {
      this.errorMessage = 'Veuillez saisir un numéro de facture valide.';
      return;
    }

    if (this.route.snapshot.paramMap.get('id') === String(id)) {
      this.loadBill(id);
      return;
    }

    void this.router.navigate(['/bills', id]);
  }

  private loadBill(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.bill = null;
    this.billService.getBillById(id).subscribe({
      next: data => {
        this.bill = data;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: err => {
        console.error('Erreur de chargement de la facture', err);
        this.errorMessage = 'Cette facture est introuvable ou ne peut pas être chargée.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }
}
