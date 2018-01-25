import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Question } from '../../../utils/index';
import { Observable } from 'rxjs/Observable';
import * as fromQuestion from '../../ngrx/reducers/index';
import * as questionAction from '../../ngrx/actions/question.action';
import { QuestionUpOrCancel } from '../recommend-list/recommend-list.component';

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

  public onUpOrCancelQuestion(payload: QuestionUpOrCancel): void {
    if (payload.isUp) {
      this.store.dispatch(new questionAction.Up(payload.questionId));
    } else {
      this.store.dispatch(new questionAction.CancelUp(payload.questionId));
    }
  }

}
