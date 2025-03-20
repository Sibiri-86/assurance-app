import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulationOrdreTierPayantComponent } from './consulation-ordre-tier-payant.component';

describe('ConsulationOrdreTierPayantComponent', () => {
  let component: ConsulationOrdreTierPayantComponent;
  let fixture: ComponentFixture<ConsulationOrdreTierPayantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulationOrdreTierPayantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulationOrdreTierPayantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
