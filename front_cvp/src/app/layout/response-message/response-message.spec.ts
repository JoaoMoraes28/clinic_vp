import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseMessage } from './response-message';

describe('ResponseMessage', () => {
  let component: ResponseMessage;
  let fixture: ComponentFixture<ResponseMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponseMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
