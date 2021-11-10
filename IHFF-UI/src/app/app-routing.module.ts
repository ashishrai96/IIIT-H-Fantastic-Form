import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioTranscriptComponent } from './components/audio-transcript/audio-transcript.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';

const routes: Routes = [
  { path: 'form', component: SurveyFormComponent },
  { path: 'transcript', component: AudioTranscriptComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
