import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormElement } from 'src/app/shared/models/form-element.model';
import { SurveyBuilderService } from '../../survey-builder.service';

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.scss']
})
export class FormResponsesComponent implements OnInit {

  formArray: FormElement[] = [];

  constructor(private activateRoute: ActivatedRoute, 
    private surveyBuilderService: SurveyBuilderService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      if(params && params['formId']){
        this.loadFormResponse(params['formId']);
      }
    });
  }

  loadFormResponse(formId){
    this.surveyBuilderService.loadResponseByFormId(formId).subscribe((resp:any) => {
      console.log(resp);
      this.formArray = [ ...resp.response[0].items ];
    });
  }

}
