import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarIcon } from './nav-bar-icon';

describe('NavBarIcon', () => {
  let component: NavBarIcon;
  let fixture: ComponentFixture<NavBarIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
