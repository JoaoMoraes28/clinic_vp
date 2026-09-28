import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLabel } from './data-label';

describe('DataLabel', () => {
  let component: DataLabel;
  let fixture: ComponentFixture<DataLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLabel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
