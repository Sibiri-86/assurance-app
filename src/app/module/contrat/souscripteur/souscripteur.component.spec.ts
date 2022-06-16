import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscripteurComponent } from './souscripteur.component';

describe('SouscripteurComponent', () => {
  let component: SouscripteurComponent;
  let fixture: ComponentFixture<SouscripteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouscripteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouscripteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
