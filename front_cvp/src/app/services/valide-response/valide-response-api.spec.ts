import { TestBed } from '@angular/core/testing';
import { ValideResponseApi } from './valide-response-api';

describe('ValideResponseApi', () => {
  let service: ValideResponseApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValideResponseApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
