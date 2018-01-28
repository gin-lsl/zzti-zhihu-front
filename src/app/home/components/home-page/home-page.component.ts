import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Question } from '../../../utils/index';
import { Observable } from 'rxjs/Observable';
import * as fromQuestion from '../../ngrx/reducers/index';
import * as questionAction from '../../ngrx/actions/question.action';
import { QuestionActionPayload } from '../recommend-list/recommend-list.component';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  public questions$: Observable<any>;

  constructor(private store: Store<fromQuestion.State>) {
    this.questions$ = store.select(fromQuestion.getLoadedQuestions);
  }

  ngOnInit() {
    this.store.dispatch(new questionAction.Load(10));
  }

  public onUpOrCancelQuestion(payload: QuestionActionPayload): void {
    this.store.dispatch(payload.isTrue ? new questionAction.Up(payload.id) : new questionAction.CancelUp(payload.id));
  }

  public onDownOrCancelQuestion(payload: QuestionActionPayload): void {
    this.store.dispatch(payload.isTrue ? new questionAction.Down(payload.id) : new questionAction.CancelDown(payload.id));
  }

  public onLikeOrUnlikeQuestion(payload: QuestionActionPayload): void {
    this.store.dispatch(payload.isTrue ? new questionAction.Like(payload.id) : new questionAction.UnLike(payload.id));
  }

}
