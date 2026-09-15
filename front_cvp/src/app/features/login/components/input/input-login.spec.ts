import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputLogin } from './input-login';

describe('InputLogin', () => {
  let component: InputLogin;
  let fixture: ComponentFixture<InputLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(InputLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
