import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultationsTable } from './consultations-table';

describe('ConsultationsTable', () => {
  let component: ConsultationsTable;
  let fixture: ComponentFixture<ConsultationsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
