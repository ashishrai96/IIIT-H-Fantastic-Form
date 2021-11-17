import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLikertScaleComponent } from './form-likert-scale.component';

describe('FormLikertScaleComponent', () => {
  let component: FormLikertScaleComponent;
  let fixture: ComponentFixture<FormLikertScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLikertScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLikertScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
