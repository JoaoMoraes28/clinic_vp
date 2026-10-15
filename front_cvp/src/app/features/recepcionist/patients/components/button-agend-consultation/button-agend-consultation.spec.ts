import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonAgendConsultation } from './button-agend-consultation';

describe('ButtonAgendConsultation', () => {
  let component: ButtonAgendConsultation;
  let fixture: ComponentFixture<ButtonAgendConsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAgendConsultation],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonAgendConsultation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
