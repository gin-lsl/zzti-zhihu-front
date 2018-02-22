import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CommentList } from '../../../utils/classes/comment';
import * as commentAction from '../../../ngrx/comment/actions/comment.action';
import * as fromCommentModule from '../../../ngrx/comment/reducers/index';

@Component({
  selector: 'app-question-comment-container',
  templateUrl: './question-comment-container.component.html',
  styleUrls: ['./question-comment-container.component.less']
})
export class QuestionCommentContainerComponent implements OnInit {

  public commentList$: Observable<any>;

  @Input()
  public questionId: string;

  @Input()
  public replyId: string;

  constructor(private _store: Store<any>) { }

  ngOnInit() {
    this.commentList$ = this._store.select(fromCommentModule.getCommentsByCurrentQuestionIdAndReplyId(this.replyId));
  }

  public onSubmitComment(commentPayload: string): void {
    this._store.dispatch(new commentAction.Post({
      content: commentPayload,
      questionId: this.questionId,
      replyId: this.replyId,
    }));
  }

}
