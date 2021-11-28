import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SurveyFormComponent } from './components/survey-builder/survey-form/survey-form.component';
import { AudioTranscriptComponent } from './components/survey-builder/audio-transcript/audio-transcript.component';
import { FormQuestionsComponent } from './components/survey-builder/survey-form/form-questions/form-questions.component';
import { FormResponsesComponent } from './components/survey-builder/survey-form/form-responses/form-responses.component';
import { FormCardComponent } from './components/survey-builder/survey-form/form-questions/form-card/form-card.component';
import { FormsModule } from '@angular/forms';
import { FormLikertScaleComponent } from './components/survey-builder/survey-form/form-questions/form-card/form-likert-scale/form-likert-scale.component';
import { SurveyBuilderComponent } from './components/survey-builder/survey-builder.component';
import { FormResponseCardComponent } from './components/survey-builder/survey-form/form-responses/form-response-card/form-response-card.component';
import { FormLiveComponent } from './components/survey-builder/survey-form/form-live/form-live.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
// import { LoginComponent } from './auth/login/login.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageService } from 'primeng/api';
import { FormSubmittedComponent } from './components/survey-builder/survey-form/form-submitted/form-submitted.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent,
    AudioTranscriptComponent,
    FormQuestionsComponent,
    FormResponsesComponent,
    FormCardComponent,
    FormLikertScaleComponent,
    SurveyBuilderComponent,
    FormResponseCardComponent,
    FormLiveComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    FormSubmittedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
