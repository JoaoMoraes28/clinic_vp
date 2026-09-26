import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationBall } from './location-ball';

describe('LocationBall', () => {
  let component: LocationBall;
  let fixture: ComponentFixture<LocationBall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBall],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationBall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
