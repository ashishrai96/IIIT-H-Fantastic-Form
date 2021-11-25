import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { Constants } from 'src/app/shared/models/constants.model';
import { FormElement } from 'src/app/shared/models/form-element.model';
import { SurveyBuilderDataExchangeService } from '../../survey-builder-data-exchange.service';
import { SurveyBuilderService } from '../../survey-builder.service';

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.component.html',
  styleUrls: ['./form-questions.component.scss']
})
export class FormQuestionsComponent implements OnInit {

  formArray: FormElement[] = [];
  formTitle: string = '';

  constants = Constants;
  allowEdit: boolean = true;
  preview: boolean = false;
  private isLive: boolean = false;

  constructor(private surveyDataExchnage: SurveyBuilderDataExchangeService, 
    private surveyService: SurveyBuilderService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.surveyDataExchnage.getPreview().subscribe((preview:boolean) => {
      this.allowEdit = !preview;
      this.preview = preview;
      this.formArray = [ ...this.formArray ];
    });
    
    this.surveyDataExchnage.listenPublishEvent().subscribe(() => {
      this.publishForm();
    });
  }

  AddNewElement(type: number){
    let elem: FormElement = {
      questionId: null,
      type: type,
      question: '',
      description: '',
      answer: '',
      required: false,
    };

    if(type == this.constants.FORM_ELEM_TEXT_OPTION){
      elem.validations = { rule: '', value1: '', value2: '' };
    }
    else if(type == this.constants.FORM_ELEM_CHOICE_OPTION){
      elem.isMultiChoice = false;
      elem.choices = ['ashish', 'rai'];
    }
    else if(type == this.constants.FORM_ELEM_LIKER_SCALE_OPTION){
      elem.choices = ['c11', 'c22', 'c33'];
      elem.statements = ['s1', 's2', 's3'];
    }

    console.log(elem);
    this.formArray.push(elem);
  }

  onDelete(index: number) {
    this.formArray.splice(index, 1);
  }

  onClone(index: number) {
    let elem = { ...this.formArray[index] };
    // setTimeout(() => {
    //   this.formArray[index].editMode = false;
    // }, 0);

    this.formArray = [ ...this.formArray.slice(0, index+1), elem, ...this.formArray.slice(index+1) ];
    console.log(this.formArray);
  }

  publishForm(){
    let form = {
      "title": this.formTitle,
      "formId": null,
      "items": this.formArray
    };

    console.log(JSON.stringify(form));

    this.loader.start();
    this.surveyService.saveForm(form).subscribe((resp:any) => {
      console.log("Response for save => ", resp);
      this.loader.stop();
    },
    err => {
      console.error("Form saving response => ", err);
      this.loader.stop();
    });

  }

}
