import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { FormElement } from 'src/app/shared/models/form-element.model';
import { SurveyBuilderService } from '../../survey-builder.service';

@Component({
  selector: 'app-form-live',
  templateUrl: './form-live.component.html',
  styleUrls: ['./form-live.component.scss']
})
export class FormLiveComponent implements OnInit {

  formData: any;
  formTitle: string;

  constructor(private activateRoute: ActivatedRoute, 
    private surveyService: SurveyBuilderService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params:Params) => {
      console.log(params);
    });

    this.loader.start();
    this.surveyService.loadResponseByFormId(1234567890).subscribe((resp:any) => {
      this.formData = resp.response[0];
      this.formTitle = resp.title;
      this.loader.stop();
    },
    err => {
      console.error(err);
      this.loader.stop();
    });
  }

  submitResponse(){
    console.log("To submit = ", this.formData);
  }

}
