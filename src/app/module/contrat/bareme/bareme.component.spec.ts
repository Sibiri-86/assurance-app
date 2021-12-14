import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaremeComponent } from './bareme.component';

describe('BaremeComponent', () => {
  let component: BaremeComponent;
  let fixture: ComponentFixture<BaremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaremeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
