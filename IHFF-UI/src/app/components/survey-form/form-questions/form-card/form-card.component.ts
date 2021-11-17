import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/shared/models/constants.model';
import { FormElement } from 'src/app/shared/models/form-element.model';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {

  @Input() value: FormElement;
  @Input() index: number;
  @Output() onClone: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  
  dummy = false;
  constants = Constants;
  isInsideClicked: boolean = false;
  firstClickDone: boolean = false;

  restrictions:{ name:string, code:string }[] = [];
  rule: { name: string; code: string; };

  constructor() { }

  @HostListener('click')
  insideClicked(): void {
    this.value.editMode = true;
    this.isInsideClicked = true;
    console.log("In");
  }

  @HostListener('document:click')
  outsideClicked(): void {
    if(!this.isInsideClicked && this.firstClickDone){
      this.value.editMode = false;
      console.log("Out");
    }
    this.isInsideClicked = false;
    this.firstClickDone = true;
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

  choiceTrackBy = (index, item) => index;

}
