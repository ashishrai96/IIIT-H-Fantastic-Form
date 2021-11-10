import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { AudioTranscriptComponent } from './components/audio-transcript/audio-transcript.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    AudioTranscriptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
