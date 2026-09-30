import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationLabel } from './information-label';

describe('InformationLabel', () => {
  let component: InformationLabel;
  let fixture: ComponentFixture<InformationLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(InformationLabel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
