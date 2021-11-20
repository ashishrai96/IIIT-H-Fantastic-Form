import { TestBed } from '@angular/core/testing';

import { AudioTranscriptService } from './audio-transcript.service';

describe('AudioTranscriptService', () => {
  let service: AudioTranscriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioTranscriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
