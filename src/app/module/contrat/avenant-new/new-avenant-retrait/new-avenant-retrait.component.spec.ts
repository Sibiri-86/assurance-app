import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvenantRetraitComponent } from './new-avenant-retrait.component';

describe('NewAvenantRetraitComponent', () => {
  let component: NewAvenantRetraitComponent;
  let fixture: ComponentFixture<NewAvenantRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAvenantRetraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvenantRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
