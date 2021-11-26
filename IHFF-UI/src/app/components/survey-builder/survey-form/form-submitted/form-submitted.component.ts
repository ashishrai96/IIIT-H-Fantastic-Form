import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-submitted',
  templateUrl: './form-submitted.component.html',
  styleUrls: ['./form-submitted.component.scss']
})
export class FormSubmittedComponent implements OnInit {

  message: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoHome(){
    this.router.navigateByUrl("/survey/form/dashboard");
  }

}
