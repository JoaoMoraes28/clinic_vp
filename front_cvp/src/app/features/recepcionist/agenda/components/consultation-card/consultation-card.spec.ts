import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultationCard } from './consultation-card';

describe('ConsultationCard', () => {
  let component: ConsultationCard;
  let fixture: ComponentFixture<ConsultationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
