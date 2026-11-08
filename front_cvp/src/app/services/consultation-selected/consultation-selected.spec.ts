import { TestBed } from '@angular/core/testing';
import { ConsultationSelected } from './consultation-selected';

describe('ConsultationSelected', () => {
  let service: ConsultationSelected;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationSelected);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
