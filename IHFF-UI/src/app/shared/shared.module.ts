import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {ToggleButtonModule} from 'primeng/togglebutton';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AvatarModule,
    ToggleButtonModule
  ],
  exports: [
    AvatarModule,
    ToggleButtonModule
  ]
})
export class SharedModule { }
