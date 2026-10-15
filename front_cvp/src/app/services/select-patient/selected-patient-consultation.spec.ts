import { TestBed } from '@angular/core/testing';
import { SelectedPatientConsultation } from './selected-patient-consultation';

describe('SelectedPatientConsultation', () => {
  let service: SelectedPatientConsultation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedPatientConsultation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
