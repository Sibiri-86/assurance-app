import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreReglementConsultationComponent } from './ordre-reglement-consultation.component';

describe('OrdreReglementConsultationComponent', () => {
  let component: OrdreReglementConsultationComponent;
  let fixture: ComponentFixture<OrdreReglementConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreReglementConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreReglementConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
