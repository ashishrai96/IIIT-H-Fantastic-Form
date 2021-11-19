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
import { LoaderComponent } from './components/loader/loader.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    LoaderComponent,
    NotFoundComponent
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
    ChartModule,
    LoaderComponent
  ]
})
export class SharedModule { }
