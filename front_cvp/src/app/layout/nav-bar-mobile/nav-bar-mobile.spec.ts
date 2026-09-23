import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarMobile } from './nav-bar-mobile';

describe('NavBarMobile', () => {
  let component: NavBarMobile;
  let fixture: ComponentFixture<NavBarMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarMobile],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
