import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleConsultation } from './schedule-consultation';

describe('ScheduleConsultation', () => {
  let component: ScheduleConsultation;
  let fixture: ComponentFixture<ScheduleConsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleConsultation],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleConsultation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
