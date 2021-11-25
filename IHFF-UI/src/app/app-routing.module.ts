import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { AudioTranscriptComponent } from './components/survey-builder/audio-transcript/audio-transcript.component';
import { SurveyBuilderComponent } from './components/survey-builder/survey-builder.component';
import { FormLiveComponent } from './components/survey-builder/survey-form/form-live/form-live.component';
import { FormQuestionsComponent } from './components/survey-builder/survey-form/form-questions/form-questions.component';
import { FormResponsesComponent } from './components/survey-builder/survey-form/form-responses/form-responses.component';
import { SurveyFormComponent } from './components/survey-builder/survey-form/survey-form.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'survey', component: SurveyBuilderComponent, canActivate: [ AuthGuard ],
    children:
    [
      {
        path: 'form', component: SurveyFormComponent,
        children: [
          { path: 'questions', component: FormQuestionsComponent },
          { path: 'responses/:formId', component: FormResponsesComponent },
          { path: '', pathMatch: 'full', redirectTo: 'questions' }
        ]
      },
      { path: 'transcript', component: AudioTranscriptComponent },
      { path: 'live/:formId/:title', component: FormLiveComponent },
      { path: '', pathMatch: 'full', redirectTo: 'form' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
