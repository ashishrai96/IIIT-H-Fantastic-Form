import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from 'primeng/avatar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AvatarModule
  ],
  exports: [
    AvatarModule
  ]
})
export class SharedModule { }
