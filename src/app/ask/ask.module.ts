import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskRoutingModule } from './ask-routing.module';
import { QuillModule } from 'ngx-quill';

import { AskPageComponent } from './components/ask-page/ask-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AskRoutingModule,
    SharedModule,
    QuillModule,
  ],
  declarations: [
    AskPageComponent,
  ]
})
export class AskModule { }
