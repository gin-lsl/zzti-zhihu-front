import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionPageComponent } from './components/question-page/question-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: QuestionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
