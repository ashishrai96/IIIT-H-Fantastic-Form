import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioTranscriptComponent } from './components/audio-transcript/audio-transcript.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormQuestionsComponent } from './components/survey-form/form-questions/form-questions.component';
import { FormResponsesComponent } from './components/survey-form/form-responses/form-responses.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';

const routes: Routes = [
  { 
    path: 'form', component: SurveyFormComponent,
    children: [
      { path: 'questions', component: FormQuestionsComponent },
      { path: 'responses', component: FormResponsesComponent },
      { path: '', pathMatch: 'full', redirectTo: 'questions' }
    ]
  },
  { path: 'transcript', component: AudioTranscriptComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
