import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdrePaimentInstanceComponent } from './ordre-paiment-instance.component';

describe('OrdreReglementValideComponent', () => {
  let component: OrdrePaimentInstanceComponent;
  let fixture: ComponentFixture<OrdrePaimentInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdrePaimentInstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdrePaimentInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
