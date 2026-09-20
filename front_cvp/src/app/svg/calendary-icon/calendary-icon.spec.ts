import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendaryIcon } from './calendary-icon';

describe('CalendaryIcon', () => {
  let component: CalendaryIcon;
  let fixture: ComponentFixture<CalendaryIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendaryIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendaryIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
