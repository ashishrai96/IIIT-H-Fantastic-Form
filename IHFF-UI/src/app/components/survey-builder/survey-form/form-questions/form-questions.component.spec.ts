import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionsComponent } from './form-questions.component';

describe('FormQuestionsComponent', () => {
  let component: FormQuestionsComponent;
  let fixture: ComponentFixture<FormQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
