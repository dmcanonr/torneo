import { TestBed } from '@angular/core/testing';

import { NarradorService } from './narrador.service';

describe('NarradorService', () => {
  let service: NarradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
