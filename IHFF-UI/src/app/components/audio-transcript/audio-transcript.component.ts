import { Component, OnInit } from '@angular/core';
import { AudioTranscriptService } from './service/audio-transcript.service';

@Component({
  selector: 'app-audio-transcript',
  templateUrl: './audio-transcript.component.html',
  styleUrls: ['./audio-transcript.component.scss']
})
export class AudioTranscriptComponent implements OnInit {
  filename:string;
  fileInfo:string;
  transcript:string;
  description:string;
  constructor(private audioService : AudioTranscriptService) { }

  ngOnInit(): void {
  }

  myUploader(event) {
    this.filename=event.files[0].name;
    console.log(event.files[0])  
  }
}
