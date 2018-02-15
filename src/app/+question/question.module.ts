import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { QuestionRoutingModule } from './question-routing.module';

import { QuestionDetailDescriptionComponent } from './components/question-detail-description/question-detail-description.component';
import { QuestionPageComponent } from './components/question-page/question-page.component';
import { QuestionReplyListComponent } from './components/question-reply-list/question-reply-list.component';
import { QuestionReplyListContainerComponent } from './containers/question-reply-list-container/question-reply-list-container.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule,
    SharedModule,
  ],
  declarations: [
    QuestionDetailDescriptionComponent,
    QuestionPageComponent,
    QuestionReplyListComponent,
    QuestionReplyListContainerComponent,
  ]
})
export class QuestionModule { }
