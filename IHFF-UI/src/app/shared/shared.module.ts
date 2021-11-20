import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AvatarModule,
    ToggleButtonModule,
    FileUploadModule
  ],
  exports: [
    AvatarModule,
    ToggleButtonModule,
    FileUploadModule
  ]
})
export class SharedModule { }
