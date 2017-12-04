import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
} from '@angular/material';

import { TopNavComponent } from './components/top-nav/top-nav.component';
import { CommonOperationComponent } from './components/common-operation/common-operation.component';
import { MyServiceCardComponent } from './components/my-service-card/my-service-card.component';
import { NewQuestionBoxComponent } from './components/new-question-box/new-question-box.component';

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
];

/**
 * 组件
 */
const components = [
  TopNavComponent,
  CommonOperationComponent,
  MyServiceCardComponent,
  NewQuestionBoxComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
    ...materialModules,
    ...components,
  ]
})
export class SharedModule { }
