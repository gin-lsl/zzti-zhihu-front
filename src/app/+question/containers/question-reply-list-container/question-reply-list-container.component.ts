import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ReplyList } from '../../../utils/index';
import * as replyAction from '../../../ngrx/reply/actions/reply.action';
import * as fromReplyModule from '../../../ngrx/reply/reducers/index';

@Component({
  selector: 'app-question-reply-list-container',
  templateUrl: './question-reply-list-container.component.html',
  styleUrls: ['./question-reply-list-container.component.less']
})
export class QuestionReplyListContainerComponent {

  public replies$: Observable<ReplyList>;

  constructor(private _store: Store<fromReplyModule.State>) {
    this.replies$ = _store.select(fromReplyModule.getRepliesByCurrentSelectQuestionId);
  }

}
