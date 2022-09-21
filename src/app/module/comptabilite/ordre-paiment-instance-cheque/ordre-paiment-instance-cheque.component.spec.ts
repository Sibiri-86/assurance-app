import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdrePaimentInstanceChequeComponent } from './ordre-paiment-instance-cheque.component';

describe('OrdreReglementValideComponent', () => {
  let component: OrdrePaimentInstanceChequeComponent;
  let fixture: ComponentFixture<OrdrePaimentInstanceChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdrePaimentInstanceChequeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdrePaimentInstanceChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
