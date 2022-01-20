import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefinancementEditionComponent } from './prefinancement-edition.component';

describe('PrefinancementEditionComponent', () => {
  let component: PrefinancementEditionComponent;
  let fixture: ComponentFixture<PrefinancementEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefinancementEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefinancementEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
