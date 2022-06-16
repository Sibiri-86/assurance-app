import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityValidationComponent } from './entity-validation.component';

describe('EntityValidationComponent', () => {
  let component: EntityValidationComponent;
  let fixture: ComponentFixture<EntityValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
