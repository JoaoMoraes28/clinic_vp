import { TestBed } from '@angular/core/testing';
import { LoadingMessage } from './loading-message';

describe('LoadingMessage', () => {
  let service: LoadingMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
