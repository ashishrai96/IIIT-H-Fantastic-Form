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
    console.log(event.files[0])  
    let data = new FormData();
    data.append('file',event.files[0]);
    this.audioService.upload(data).subscribe((resp) => {
      console.log(resp);
      this.transcript = resp['response'];
    }, 
    (err)=> {
      console.log(err);
    });
  }
}
