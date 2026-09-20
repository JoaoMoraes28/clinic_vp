import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPatient } from './registration-patient';

describe('RegistrationPatient', () => {
  let component: RegistrationPatient;
  let fixture: ComponentFixture<RegistrationPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPatient],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
