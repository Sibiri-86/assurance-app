import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonPriseEnChargeComponent } from './bon-prise-en-charge.component';

describe('BonPriseEnChargeComponent', () => {
  let component: BonPriseEnChargeComponent;
  let fixture: ComponentFixture<BonPriseEnChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonPriseEnChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonPriseEnChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
