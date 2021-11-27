import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { Constants } from 'src/app/shared/models/constants.model';
import { FormElement } from 'src/app/shared/models/form-element.model';
import { SurveyBuilderDataExchangeService } from '../../survey-builder-data-exchange.service';
import { SurveyBuilderService } from '../../survey-builder.service';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';

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

  constructor(private router: Router, private messageService: MessageService,
    private surveyDataExchnage: SurveyBuilderDataExchangeService, 
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
      elem.choices = [''];
    }
    else if(type == this.constants.FORM_ELEM_LIKER_SCALE_OPTION){
      elem.choices = [''];
      elem.statements = [''];
    }

    console.log(elem);
    this.formArray.push(elem);
  }

  onDelete(index: number) {
    this.formArray.splice(index, 1);
  }

  onClone(index: number) {
    let elem = _.cloneDeep({ ...this.formArray[index] });
    // setTimeout(() => {
    //   this.formArray[index].editMode = false;
    // }, 0);

    this.formArray = [ ...this.formArray.slice(0, index+1), elem, ...this.formArray.slice(index+1) ];
    console.log(this.formArray);
  }

  /**
   * 
   * @param form 
   * @returns 
   *  0: OK
   * -1: Empty/Invalid Input
   * -2: Duplicate
   * -3: No items
   */
  validatePublishing(form): number {
    if(!form.title || form.title.length == 0){
      return -1;
    }

    if(!form.items || form.items.length == 0){
      return -3;
    }

    let setqu = new Set<string>();
    for(let elem of form.items){
      if(!elem.question || elem.question == ""){
        return -1;
      }

      if(setqu.has(elem.question)){
        return -2;
      }

      setqu.add(elem.question);

      if(elem.type != Constants.FORM_ELEM_TEXT_OPTION){
        let setch = new Set();
        for(let ch of elem.choices){
          if(!ch || ch == ''){
            return -1;
          }

          if(setch.has(ch)){
            return -2;
          }

          setch.add(ch);
        }
        setch.clear();
      }
      
      if(elem.type == Constants.FORM_ELEM_LIKER_SCALE_OPTION) {
        let setst = new Set();
        for(let st of elem.statements){
          if(!st || st == ''){
            return -1;
          }

          if(setst.has(st)){
            return -2;
          }

          setst.add(st);
        }

        setst.clear();
      }
    }
    setqu.clear();

    return 0;
  }

  publishForm(){
    let form = {
      "title": this.formTitle,
      "formId": null,
      "items": this.formArray
    };

    console.log(JSON.stringify(form));

    let isvalid = this.validatePublishing(form);
    if(isvalid == -1){
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Inputs',
        detail: 'Please give valid inputs'
      });
      return;
    }
    else if(isvalid == -2){
      this.messageService.add({
        severity: 'error',
        summary: 'Duplicate Inputs',
        detail: 'Please check the inputs'
      });
      return;
    }
    else if(isvalid == -3){
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Form',
        detail: 'Please check your form'
      });
      return;
    }

    this.loader.start();
    this.surveyService.saveForm(form).subscribe((resp:any) => {
      console.log("Response for save => ", resp);
      this.loader.stop();
      this.router.navigateByUrl("/survey/form/dashboard");
    },
    err => {
      console.error("Form saving response => ", err);
      this.loader.stop();
    });

  }

}
