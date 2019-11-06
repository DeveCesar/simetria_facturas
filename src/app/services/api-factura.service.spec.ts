import { TestBed } from '@angular/core/testing';

import { ApiFacturaService } from './api-factura.service';

describe('ApiFacturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiFacturaService = TestBed.get(ApiFacturaService);
    expect(service).toBeTruthy();
  });
});
