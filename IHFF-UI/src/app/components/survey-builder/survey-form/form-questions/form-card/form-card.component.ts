import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/shared/models/constants.model';
import { FormElement } from 'src/app/shared/models/form-element.model';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit, OnChanges {

  @Input() value: FormElement;
  @Input() index: number;
  @Input() allowEdit: boolean = true;
  @Input() readonly: boolean = false;
  @Output() onClone: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  
  dummy = false;
  constants = Constants;
  isInsideClicked: boolean = false;
  firstClickDone: boolean = false;

  restrictions:{ name:string, code:string }[] = [];
  rule: { name: string; code: string; };

  constructor() { }

  // @HostListener('click')
  // insideClicked(): void {
  //   if(!this.allowEdit){
  //     return;
  //   }

  //   this.value.editMode = true;
  //   this.isInsideClicked = true;
  //   console.log("In");
  // }

  // @HostListener('document:click')
  // outsideClicked(): void {
  //   if(!this.allowEdit){
  //     return;
  //   }

  //   if(!this.isInsideClicked && this.firstClickDone){
  //     this.value.editMode = false;
  //     console.log("Out");
  //   }
  //   this.isInsideClicked = false;
  //   this.firstClickDone = true;
  // }

  ngOnChanges() {
    console.log("hello")
    this.value.editMode = this.allowEdit;
  }

  ngOnInit(): void {
    this.restrictions = [
      { name: 'None', code: 'N' },
      { name: 'Length Greater Than', code: 'GT' },
      { name: 'Length Greater Than or Equals', code: 'GE' },
      { name: 'Lenght Less Than', code: 'LT' },
      { name: 'Length Less Than or Equals', code: 'LE' },
      { name: 'Length Between', code: 'BW' }
    ];
    this.rule = this.restrictions[0];

  }

  onLikertAnswerUpdate(event){
    this.value.answer = [ ...event ];
  }

  updateValidationInfo(){
    this.value.validations.rule = this.rule.code;
    console.log("riledmcsdvbv",this.rule);
  }
  
  onCloneHandler() {
    this.onClone.emit();
  }

  onDeleteHandler() {
    this.onDelete.emit();
  }

  onAddNewChoice() {
    this.value.choices = [ ...this.value.choices, '' ];
  }

  onDeleteChoice(index: number){
    if(this.value.choices.length < 2){
      return;
    }
    
    this.value.choices.splice(index,1);
  }

  check() {
    console.log(this.value);
  }

  clearAnswer(){
    if(this.value.type == this.constants.FORM_ELEM_LIKER_SCALE_OPTION){
      setTimeout(() => { this.value.answer = [ ...new Array(this.value.statements.length).fill(null) ]; }, 0);
    }
    else{
      this.value.answer = "";
    }
  }

  choiceTrackBy = (index, item) => index;

}
