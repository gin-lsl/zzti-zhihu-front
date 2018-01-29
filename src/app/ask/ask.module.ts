import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskRoutingModule } from './ask-routing.module';
import { QuillModule } from 'ngx-quill';

import { AskPageComponent } from './components/ask-page/ask-page.component';
import { SharedModule } from '../shared/shared.module';
import { AskPreComponent } from './components/ask-pre/ask-pre.component';
import { AskPrePageComponent } from './containers/ask-pre-page/ask-pre-page.component';
import { EffectsModule } from '@ngrx/effects';
import { SearchTextEffects } from './ngrx/effects/search-text.effect';
import { StoreModule } from '@ngrx/store';
import * as fromAskModule from './ngrx/reducers/index';

@NgModule({
  imports: [
    CommonModule,
    AskRoutingModule,
    SharedModule,
    QuillModule,
    StoreModule.forFeature('askModule', fromAskModule.reducers),
    EffectsModule.forFeature([SearchTextEffects]),
  ],
  declarations: [
    AskPageComponent,
    AskPreComponent,
    AskPrePageComponent,
  ]
})
export class AskModule { }
