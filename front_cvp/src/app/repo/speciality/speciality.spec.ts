import { TestBed } from '@angular/core/testing';
import { Speciality } from './speciality';

describe('Speciality', () => {
  let service: Speciality;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Speciality);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
