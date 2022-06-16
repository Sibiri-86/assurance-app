import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreReglementEditionComponent } from './ordre-reglement-edition.component';

describe('OrdreReglementEditionComponent', () => {
  let component: OrdreReglementEditionComponent;
  let fixture: ComponentFixture<OrdreReglementEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreReglementEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreReglementEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
