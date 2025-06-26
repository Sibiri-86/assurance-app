import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvenantIncorporationWrittingComponent } from './new-avenant-incorporation-writting.component';

describe('NewAvenantIncorporationWrittingComponent', () => {
  let component: NewAvenantIncorporationWrittingComponent;
  let fixture: ComponentFixture<NewAvenantIncorporationWrittingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAvenantIncorporationWrittingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvenantIncorporationWrittingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
