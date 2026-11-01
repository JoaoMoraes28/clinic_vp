import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutputLoading } from './output-loading';

describe('OutputLoading', () => {
  let component: OutputLoading;
  let fixture: ComponentFixture<OutputLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputLoading],
    }).compileComponents();

    fixture = TestBed.createComponent(OutputLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
