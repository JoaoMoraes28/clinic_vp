import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldsetList } from './fieldset-list';

describe('FieldsetList', () => {
  let component: FieldsetList;
  let fixture: ComponentFixture<FieldsetList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsetList],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldsetList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
