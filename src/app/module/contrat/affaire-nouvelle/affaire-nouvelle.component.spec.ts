import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireNouvelleComponent } from './affaire-nouvelle.component';

describe('AffaireNouvelleComponent', () => {
  let component: AffaireNouvelleComponent;
  let fixture: ComponentFixture<AffaireNouvelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffaireNouvelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireNouvelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
