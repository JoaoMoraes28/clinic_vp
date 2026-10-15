import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultationPreview } from './consultation-preview';

describe('ConsultationModal', () => {
  let component: ConsultationPreview;
  let fixture: ComponentFixture<ConsultationPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
