import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudioTranscriptService {

  constructor(private http: HttpClient) { }

  upload(data) {
    return this.http.post(environment.baseUrl + environment.api.transcript ,data);
  }
}
