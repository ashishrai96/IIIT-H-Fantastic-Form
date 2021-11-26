import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioTranscriptService {

  constructor(private http:HttpClient) { }
  upload(data){
    return this.http.post("",data);
  }
}
