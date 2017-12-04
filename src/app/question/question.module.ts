import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { QuestionRoutingModule } from './question-routing.module';

import { QuestionAnswerCardComponent } from './components/question-answer-card/question-answer-card.component';
import { QuestionAnswerListComponent } from './components/question-answer-list/question-answer-list.component';
import { QuestionDetailDescriptionComponent } from './components/question-detail-description/question-detail-description.component';
import { QuestionPageComponent } from './components/question-page/question-page.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    SharedModule,
  ],
  declarations: [
    QuestionAnswerCardComponent,
    QuestionAnswerListComponent,
    QuestionDetailDescriptionComponent,
    QuestionPageComponent,
  ]
})
export class QuestionModule { }
