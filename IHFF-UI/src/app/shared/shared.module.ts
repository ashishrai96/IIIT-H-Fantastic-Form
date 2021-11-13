import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AvatarModule,
    ToggleButtonModule,
    DropdownModule
  ],
  exports: [
    AvatarModule,
    ToggleButtonModule,
    DropdownModule
  ]
})
export class SharedModule { }
