import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data:any;
  constructor() { }

  ngOnInit(): void {
    this.data=[
      {description:"one"},
      {description:"two"},
      {description:"three"},
      {description:"four"},
      {description:"five"},
      {description:"six"}
    ]
  }
  
}
