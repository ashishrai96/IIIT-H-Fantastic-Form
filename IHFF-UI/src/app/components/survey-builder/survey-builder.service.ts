import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyBuilderService {

  constructor(private http: HttpClient) { }

  loadResponseByFormId(creatorId, formTitle){
    // return this.http.get('https://6194ea0374c1bd00176c6a11.mockapi.io/api/vi/response/');
    return this.http.get(environment.baseUrl + environment.api.getFormResponse + `/${creatorId}/${formTitle}`);
  }

  saveForm(form:any){
    return this.http.post(environment.baseUrl + environment.api.addForm, form);
  }

  showForm(creatorId, formTitle){
    return this.http.get(environment.baseUrl + environment.api.getForm + `/${creatorId}/${formTitle}`);
  }

  getAllFormByUser(creatorId){
    return this.http.get(environment.baseUrl + environment.api.getAllForm + `/${creatorId}`);
  }

  submitResponse(form, creatorId, formTitle){
    let req = { ...form };
    return this.http.post(environment.baseUrl + environment.api.submitForm + `/${creatorId}/${formTitle}`, req);
  }

  deactivateForm(creatorId, formTitle){
    return this.http.post(environment.baseUrl + environment.api.deactivate + `/${creatorId}/${formTitle}`, {});
  }

  deleteForm(creatorId, formTitle){
    return this.http.post(environment.baseUrl + environment.api.deleteFrom + `/${creatorId}/${formTitle}`, {});
  }

}
