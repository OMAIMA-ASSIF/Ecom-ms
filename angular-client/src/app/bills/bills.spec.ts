import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { BillService } from '../services/bill.service';
import { BillsComponent } from './bills';

describe('BillsComponent', () => {
  let component: BillsComponent;
  let fixture: ComponentFixture<BillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsComponent],
      providers: [
        provideRouter([]),
        { provide: BillService, useValue: { getBillById: () => of(null) } },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
            snapshot: { paramMap: convertToParamMap({}) }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the bill lookup form when no bill id is selected', () => {
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Rechercher une facture');
  });
});
