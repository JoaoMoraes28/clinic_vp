import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSearchPatient } from './input-search-patient';

describe('InputSearchPatient', () => {
  let component: InputSearchPatient;
  let fixture: ComponentFixture<InputSearchPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchPatient],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSearchPatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
