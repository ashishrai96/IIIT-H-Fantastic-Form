import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioTranscriptComponent } from './components/survey-builder/audio-transcript/audio-transcript.component';
import { SurveyBuilderComponent } from './components/survey-builder/survey-builder.component';
import { FormQuestionsComponent } from './components/survey-builder/survey-form/form-questions/form-questions.component';
import { FormResponsesComponent } from './components/survey-builder/survey-form/form-responses/form-responses.component';
import { SurveyFormComponent } from './components/survey-builder/survey-form/survey-form.component';

const routes: Routes = [
  {
    path: 'survey', component: SurveyBuilderComponent,
    children:
      [
        {
          path: 'form', component: SurveyFormComponent,
          children: [
            { path: 'questions', component: FormQuestionsComponent },
            { path: 'responses', component: FormResponsesComponent },
            { path: '', pathMatch: 'full', redirectTo: 'questions' }
          ]
        },
        { path: 'transcript', component: AudioTranscriptComponent },
        { path: '', pathMatch: 'full', redirectTo: 'form' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
