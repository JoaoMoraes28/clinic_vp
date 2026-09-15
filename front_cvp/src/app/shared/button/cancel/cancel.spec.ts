import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cancel } from './cancel';

describe('Cancel', () => {
  let component: Cancel;
  let fixture: ComponentFixture<Cancel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cancel],
    }).compileComponents();

    fixture = TestBed.createComponent(Cancel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
