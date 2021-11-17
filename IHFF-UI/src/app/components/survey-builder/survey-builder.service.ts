import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyBuilderService {

  constructor(private http: HttpClient) { }

  loadResponseByFormId(formId){
    return this.http.get('https://6194ea0374c1bd00176c6a11.mockapi.io/api/vi/response/');
  }

}
