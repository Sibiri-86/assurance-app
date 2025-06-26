import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvenantIncorporationComponent } from './new-avenant-incorporation.component';

describe('NewAvenantIncorporationComponent', () => {
  let component: NewAvenantIncorporationComponent;
  let fixture: ComponentFixture<NewAvenantIncorporationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAvenantIncorporationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvenantIncorporationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
