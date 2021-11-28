import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { AudioTranscriptService } from './service/audio-transcript.service';

@Component({
  selector: 'app-audio-transcript',
  templateUrl: './audio-transcript.component.html',
  styleUrls: ['./audio-transcript.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AudioTranscriptComponent implements OnInit {
  filename: string;
  fileInfo: string;
  transcript: string;
  description: string;

  constructor(private audioService: AudioTranscriptService, private messageService: MessageService,
    private loader: LoaderService) { }

  ngOnInit(): void {
  }

  myUploader(event) {
    console.log(event.files[0]);

    let formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);

    this.loader.start();
    this.audioService.upload(formData).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status == 200) {
        this.transcript = resp.message;
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: resp.message
        });
      }
      this.loader.stop();
    },
      (err) => {
        this.loader.stop();
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: ''
        });
      });


    // this.audioService.upload(formData).subscribe((event: HttpEvent<any>) => {
    //   switch (event.type) {
    //     case HttpEventType.Sent:
    //       console.log("sent", event);
    //       break;
    //     case HttpEventType.Response:
    //       // this.uploading = false;
    //       // this.progress = 0;
    //       console.log("resp", event);
    //       if (event['status'] >= 200 && event['status'] < 300) {
    //         // if (this.fileLimit) {
    //         //   this.uploadedFileCount += this.files.length;
    //         // }

    //         // this.onUpload.emit({ originalEvent: event, files: this.files });
    //       } else {
    //         // this.onError.emit({ files: this.files });
    //       }

    //       // this.clear();
    //       break;
    //     case HttpEventType.UploadProgress: {
    //       if (event['loaded']) {
    //         // this.progress = Math.round((event['loaded'] * 100) / event['total']);
    //       }
    //       console.log("uloading", event);
    //       // this.onProgress.emit({ originalEvent: event, progress: this.progress });
    //       break;
    //     }
    //   }
    // });
  }
}
