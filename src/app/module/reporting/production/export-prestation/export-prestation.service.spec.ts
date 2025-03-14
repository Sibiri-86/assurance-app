import { TestBed } from '@angular/core/testing';

import { ExportPrestationService } from './export-prestation.service';

describe('ExportPrestationService', () => {
  let service: ExportPrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportPrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
