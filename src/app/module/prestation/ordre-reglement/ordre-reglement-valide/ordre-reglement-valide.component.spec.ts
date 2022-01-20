import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreReglementValideComponent } from './ordre-reglement-valide.component';

describe('OrdreReglementValideComponent', () => {
  let component: OrdreReglementValideComponent;
  let fixture: ComponentFixture<OrdreReglementValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreReglementValideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreReglementValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
