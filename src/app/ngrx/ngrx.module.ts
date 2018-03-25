import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromCoreModule from './core/reducers/index';
import * as fromReplyModule from './reply/reducers/index';
import * as fromQuestionModule from './question/reducers/index';
import * as fromCommentModule from './comment/reducers/index';
import * as fromMessageModule from './message/reducers/index';
import { AuthEffects } from './core/effects/auth.effects';
import { UserEffects } from './core/effects/user.effect';
import { ReplyEffects } from './reply/effects/reply.effect';
import { QuestionEffects } from './question/effects/question.effect';
import { CommentEffects } from './comment/effects/comment.effect';
import { MessageEffects } from './message/effects/message.effect';

@NgModule({
  imports: [
    StoreModule.forFeature('coreModule', fromCoreModule.reducers),
    StoreModule.forFeature('replyModule', fromReplyModule.reducers),
    StoreModule.forFeature('questionModule', fromQuestionModule.reducers),
    StoreModule.forFeature('commentModule', fromCommentModule.reducers),
    StoreModule.forFeature('messageModule', fromMessageModule.reducers),
    EffectsModule.forFeature([
      AuthEffects,
      UserEffects,
      ReplyEffects,
      QuestionEffects,
      CommentEffects,
      MessageEffects,
    ]),
  ]
})
export class NgrxModule { }
