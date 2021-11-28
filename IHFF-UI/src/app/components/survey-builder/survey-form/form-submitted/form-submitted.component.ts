import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-form-submitted',
  templateUrl: './form-submitted.component.html',
  styleUrls: ['./form-submitted.component.scss']
})
export class FormSubmittedComponent implements OnInit {

  message: string;
  showThanks: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if(this.router.url == "/survey/deactivated") {
      this.showThanks = false;
    }

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        console.log(val);
        if(val.url == "/survey/deactivated" || val.urlAfterRedirects == "/survey/deactivated") {
          this.showThanks = false;
        }
        else{
          this.showThanks = true;
        }
      }
    });
  }

  ngOnInit(): void {
    
  }

  gotoHome(){
    this.router.navigateByUrl("/survey/form/dashboard");
  }

}
