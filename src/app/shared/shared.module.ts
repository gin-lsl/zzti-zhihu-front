import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatIconModule,
  MatChipsModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSelectModule,
  MatSidenavModule,
} from '@angular/material';

import { QuillModule } from 'ngx-quill';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { TopNavComponent } from './components/top-nav/top-nav.component';
import { CommonOperationComponent } from './components/common-operation/common-operation.component';
import { MyServiceCardComponent } from './components/my-service-card/my-service-card.component';
import { NewQuestionBoxComponent } from './components/new-question-box/new-question-box.component';
import { QuestionAnswerCardComponent } from './components/question-answer-card/question-answer-card.component';
import { QuestionAnswerListComponent } from './components/question-answer-list/question-answer-list.component';
import { TopNavContainerComponent } from './containers/top-nav-container/top-nav-container.component';
import { VotecellComponent } from './components/votecell/votecell.component';
import { ReplyBoxComponent } from './components/reply-box/reply-box.component';
import { QuestionCommentComponent } from './components/question-comment/question-comment.component';
import { QuestionReplyListComponent } from './components/question-reply-list/question-reply-list.component';
import { QuestionCommentContainerComponent } from './containers/question-comment-container/question-comment-container.component';
import { QuestionReplyListContainerComponent } from './containers/question-reply-list-container/question-reply-list-container.component';
import { QuestionReplyItemComponent } from './components/question-reply-item/question-reply-item.component';
import { SearchResultContainerComponent } from './containers/search-result-container/search-result-container.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

/**
 * Material 模块
 */
const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatIconModule,
  MatChipsModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSelectModule,
  MatSidenavModule,
];

/**
 * 组件
 */
const components = [
  TopNavComponent,
  CommonOperationComponent,
  MyServiceCardComponent,
  NewQuestionBoxComponent,
  QuestionAnswerCardComponent,
  QuestionAnswerListComponent,
  VotecellComponent,
  ReplyBoxComponent,
  QuestionCommentComponent,
  QuestionReplyListComponent,
  QuestionReplyItemComponent,
  SearchResultComponent,
  TopNavContainerComponent,
  SearchResultContainerComponent,
  QuestionCommentContainerComponent,
  QuestionReplyListContainerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    InfiniteScrollModule,
    ...materialModules,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    NewQuestionBoxComponent,
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    InfiniteScrollModule,
    ...materialModules,
    ...components,
  ]
})
export class SharedModule { }
