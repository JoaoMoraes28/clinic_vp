import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgesConsultation } from './badges-consultation';

describe('BadgesConsultation', () => {
  let component: BadgesConsultation;
  let fixture: ComponentFixture<BadgesConsultation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgesConsultation],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgesConsultation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
