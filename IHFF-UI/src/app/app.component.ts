import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'IHFF-UI';

  constructor(private primengConfig: PrimeNGConfig){}

  ngOnInit(){
    this.primengConfig.ripple = true;
  }

}
