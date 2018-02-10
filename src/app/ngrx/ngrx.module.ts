import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromQuestionModule from './question/reducers/index';
import * as fromCoreModule from './core/reducers/index';
import { QuestionEffects } from './question/effects/question.effect';
import { AuthEffects } from './core/effects/auth.effects';
import { UserEffects } from './core/effects/user.effect';

@NgModule({
  imports: [
    StoreModule.forFeature('questionModule', fromQuestionModule.reducers),
    StoreModule.forFeature('coreModule', fromCoreModule.reducers),
    EffectsModule.forFeature([
      QuestionEffects,
      AuthEffects,
      UserEffects,
    ]),
  ]
})
export class NgrxModule { }
