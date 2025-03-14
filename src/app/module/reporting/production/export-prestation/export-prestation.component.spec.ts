import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPrestationComponent } from './export-prestation.component';

describe('ExportPrestationComponent', () => {
  let component: ExportPrestationComponent;
  let fixture: ComponentFixture<ExportPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportPrestationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
