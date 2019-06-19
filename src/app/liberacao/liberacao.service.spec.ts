import { TestBed } from '@angular/core/testing';

import { LiberacaoService } from './liberacao.service';

describe('LiberacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiberacaoService = TestBed.get(LiberacaoService);
    expect(service).toBeTruthy();
  });
});
