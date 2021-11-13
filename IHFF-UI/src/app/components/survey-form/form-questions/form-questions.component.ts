import { Component, OnInit } from '@angular/core';
import { FormElement } from 'src/app/shared/form-element.model';

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.component.html',
  styleUrls: ['./form-questions.component.scss']
})
export class FormQuestionsComponent implements OnInit {

  formArray: FormElement[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  AddNewElement(){
    let elem: FormElement = {
      question: '',
      description: '',
      answer: '',
      required: false,
      validations: { rule: '', value1: '', value2: '' },
      editMode: true
    };
    console.log(elem);
    this.formArray.push(elem);
  }
}
