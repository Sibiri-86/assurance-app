import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvenantRenouvelementComponent } from './new-avenant-renouvelement.component';

describe('NewAvenantRenouvelementComponent', () => {
  let component: NewAvenantRenouvelementComponent;
  let fixture: ComponentFixture<NewAvenantRenouvelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAvenantRenouvelementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvenantRenouvelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
