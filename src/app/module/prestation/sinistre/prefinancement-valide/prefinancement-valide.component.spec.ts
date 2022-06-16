import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefinancementValideComponent } from './prefinancement-valide.component';

describe('PrefinancementValideComponent', () => {
  let component: PrefinancementValideComponent;
  let fixture: ComponentFixture<PrefinancementValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefinancementValideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefinancementValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
