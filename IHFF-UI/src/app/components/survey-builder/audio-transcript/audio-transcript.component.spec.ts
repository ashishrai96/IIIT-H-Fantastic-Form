import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTranscriptComponent } from './audio-transcript.component';

describe('AudioTranscriptComponent', () => {
  let component: AudioTranscriptComponent;
  let fixture: ComponentFixture<AudioTranscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTranscriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
