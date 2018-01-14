import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
} from '@angular/material';

import { QuillModule } from 'ngx-quill';

import { TopNavComponent } from './components/top-nav/top-nav.component';
import { CommonOperationComponent } from './components/common-operation/common-operation.component';
import { MyServiceCardComponent } from './components/my-service-card/my-service-card.component';
import { NewQuestionBoxComponent } from './components/new-question-box/new-question-box.component';
import { QuestionAnswerCardComponent } from './components/question-answer-card/question-answer-card.component';
import { QuestionAnswerListComponent } from './components/question-answer-list/question-answer-list.component';

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
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    QuillModule,
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
    QuillModule,
    ...materialModules,
    ...components,
  ]
})
export class SharedModule { }
