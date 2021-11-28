import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponseCardComponent } from './form-response-card.component';

describe('FormResponseCardComponent', () => {
  let component: FormResponseCardComponent;
  let fixture: ComponentFixture<FormResponseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormResponseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResponseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
