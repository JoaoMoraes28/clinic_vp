import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientDatas } from './patient-datas';

describe('PatientDatas', () => {
  let component: PatientDatas;
  let fixture: ComponentFixture<PatientDatas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientDatas],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDatas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
