import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingResponse } from './loading-response';

describe('LoadingResponse', () => {
  let component: LoadingResponse;
  let fixture: ComponentFixture<LoadingResponse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingResponse],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingResponse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
