import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {

  edit: boolean = false;
  checked: boolean = false;
  isInsideClicked: boolean = false;

  constructor() { }

  @HostListener('click')
  insideClicked(): void {
    this.edit = true;
    this.isInsideClicked = true;
    console.log("In");
  }

  @HostListener('document:click')
  outsideClicked(): void {
    if(!this.isInsideClicked){
      this.edit = false;
      console.log("Out");
    }
    this.isInsideClicked = false;
  }

  ngOnInit(): void {
  }

  

}
