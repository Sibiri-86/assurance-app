import { ComponentFixture, TestBed } from '@angular/core/testing';

import {BulletinAdhesionComponent } from './bulletin-adhesion.component';

describe('BonPriseEnChargeComponent', () => {
  let component: BulletinAdhesionComponent;
  let fixture: ComponentFixture<BulletinAdhesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinAdhesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinAdhesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
