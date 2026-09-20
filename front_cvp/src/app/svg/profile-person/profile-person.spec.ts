import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePerson } from './profile-person';

describe('ProfilePerson', () => {
  let component: ProfilePerson;
  let fixture: ComponentFixture<ProfilePerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePerson],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePerson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
