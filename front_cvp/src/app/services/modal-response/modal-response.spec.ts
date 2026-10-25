import { TestBed } from '@angular/core/testing';
import { ModalResponse } from './modal-response';

describe('ModalResponse', () => {
  let service: ModalResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
