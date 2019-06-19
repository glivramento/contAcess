import { TestBed } from '@angular/core/testing';

import { PortariaService } from './portaria.service';

describe('PortariaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortariaService = TestBed.get(PortariaService);
    expect(service).toBeTruthy();
  });
});
