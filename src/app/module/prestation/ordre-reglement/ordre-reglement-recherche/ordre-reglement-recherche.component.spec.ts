import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreReglementRechercheComponent } from './ordre-reglement-recherche.component';

describe('OrdreReglementRechercheComponent', () => {
  let component: OrdreReglementRechercheComponent;
  let fixture: ComponentFixture<OrdreReglementRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreReglementRechercheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreReglementRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
