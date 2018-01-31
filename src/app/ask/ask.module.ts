import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';
import { AskRoutingModule } from './ask-routing.module';

import { SearchEffects } from './ngrx/effects/search.effect';
import * as fromAskModule from './ngrx/reducers/index';
import { AskPageComponent } from './components/ask-page/ask-page.component';
import { AskPreComponent } from './components/ask-pre/ask-pre.component';
import { AskPrePageContainerComponent } from './containers/ask-pre-page-container/ask-pre-page-container.component';
import { AskPageContainerComponent } from './containers/ask-page-container/ask-page-container.component';

@NgModule({
  imports: [
    CommonModule,
    AskRoutingModule,
    SharedModule,
    QuillModule,
    StoreModule.forFeature('askModule', fromAskModule.reducers),
    EffectsModule.forFeature([SearchEffects]),
  ],
  declarations: [
    AskPageComponent,
    AskPreComponent,
    AskPrePageContainerComponent,
    AskPageContainerComponent,
  ]
})
export class AskModule { }
