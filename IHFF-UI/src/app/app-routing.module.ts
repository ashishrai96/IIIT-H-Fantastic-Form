import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
// import { LoginComponent } from './auth/login/login.component';
import { AudioTranscriptComponent } from './components/survey-builder/audio-transcript/audio-transcript.component';
import { SurveyBuilderComponent } from './components/survey-builder/survey-builder.component';
import { FormLiveComponent } from './components/survey-builder/survey-form/form-live/form-live.component';
import { FormQuestionsComponent } from './components/survey-builder/survey-form/form-questions/form-questions.component';
import { FormResponsesComponent } from './components/survey-builder/survey-form/form-responses/form-responses.component';
import { SurveyFormComponent } from './components/survey-builder/survey-form/survey-form.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
// import { AudioTranscriptComponent } from './components/audio-transcript/audio-transcript.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormSubmittedComponent } from './components/survey-builder/survey-form/form-submitted/form-submitted.component';

const routes: Routes = [
  {
    path: 'survey', component: SurveyBuilderComponent,
    children:
    [
      {
        path: 'form', component: SurveyFormComponent, canActivate: [AuthGuard],
        children: [
          { path: 'questions', component: FormQuestionsComponent },
          { path: 'responses/:creatorId/:title', component: FormResponsesComponent },
          { path: 'live/:creatorId/:title', component: FormLiveComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'transcript', component: AudioTranscriptComponent },
          { path: '', pathMatch: 'full', redirectTo: 'questions' },
        ]
      },
      { path: 'submitted', component: FormSubmittedComponent },
      { path: 'deactivated', component: FormSubmittedComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'survey' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
