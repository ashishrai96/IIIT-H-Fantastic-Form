import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLiveComponent } from './form-live.component';

describe('FormLiveComponent', () => {
  let component: FormLiveComponent;
  let fixture: ComponentFixture<FormLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
