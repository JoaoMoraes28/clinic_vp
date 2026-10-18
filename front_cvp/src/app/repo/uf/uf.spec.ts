import { TestBed } from '@angular/core/testing';
import { Uf } from './uf';

describe('Uf', () => {
  let service: Uf;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Uf);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
