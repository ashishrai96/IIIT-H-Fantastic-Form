import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { AudioTranscriptComponent } from './components/audio-transcript/audio-transcript.component';
import { FormQuestionsComponent } from './components/survey-form/form-questions/form-questions.component';
import { FormResponsesComponent } from './components/survey-form/form-responses/form-responses.component';
import { FormCardComponent } from './components/survey-form/form-questions/form-card/form-card.component';
import { FormsModule } from '@angular/forms';
import { FormLikertScaleComponent } from './components/survey-form/form-questions/form-card/form-likert-scale/form-likert-scale.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    AudioTranscriptComponent,
    FormQuestionsComponent,
    FormResponsesComponent,
    FormCardComponent,
    FormLikertScaleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
