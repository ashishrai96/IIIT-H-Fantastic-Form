import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {OrderListModule} from 'primeng/orderlist';
import {ChartModule} from 'primeng/chart';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AvatarModule,
    ToggleButtonModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    InputSwitchModule,
    OrderListModule,
    ChartModule
  ],
  exports: [
    AvatarModule,
    ToggleButtonModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    InputSwitchModule,
    OrderListModule,
    ChartModule
  ]
})
export class SharedModule { }
