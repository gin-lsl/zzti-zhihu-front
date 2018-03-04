import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import { Store } from '@ngrx/store';
import * as fromQuestion from '../../../ngrx/question/reducers/index';
import * as fromReply from '../../../ngrx/reply/reducers/index';
import * as questionAction from '../../../ngrx/question/actions/question.action';
import * as replyAction from '../../../ngrx/reply/actions/reply.action';
import * as commentAction from '../../../ngrx/comment/actions/comment.action';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.less']
})
export class QuestionPageComponent implements OnInit {

  public question: any;

  public replies$: Observable<any>;

  public relates$: Observable<any>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpClient: HttpClient,
    private _store: Store<fromQuestion.State>,
  ) { }

  ngOnInit() {
    this._store
      .select(fromQuestion.getCurrentSelectQuestion)
      .subscribe(q => {
        this.question = q;
        if (q) {
          this._store.dispatch(new questionAction.LoadRelates({ like: q.title, excludeId: q.id }));
        }
      });
    this.replies$ = this._store.select(fromReply.getRepliesByCurrentSelectQuestionId);
    this.relates$ = this._store.select(fromQuestion.getRelates);
    this._activatedRoute
      .paramMap
      .subscribe(params => {
        const questionId = params.get('id');
        this._store.dispatch(new questionAction.LoadOne(questionId, false));
        this._store.dispatch(new replyAction.Load(questionId));
        this._store.dispatch(new commentAction.Load(questionId));
      });
  }

  public onSubmitReply(content: any): void {
    this._store.dispatch(new replyAction.Post({ questionId: this.question.id, content }));
  }

}
