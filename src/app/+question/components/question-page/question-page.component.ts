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
        console.log('question: ', q);
      });
    this.replies$ = this._store.select(fromReply.getRepliesByCurrentSelectQuestionId);
    // .subscribe(replies => {
    //   console.log('replies: ', replies);
    // });
    this._activatedRoute
      .paramMap
      // .map(p => this._httpClient.get(`http://localhost:3000/questions/${p.get('id')}`))
      // .subscribe(r => {
      //   console.log('r: ', r);
      //   r.subscribe(r1 => console.log('r1: ', r1));
      // });
      // .map(p => this._httpClient.get(`http://localhost:3000/questions/${p.get('id')}`))
      // .switch()
      // .subscribe(r => {
      //   console.log('r: ', r);
      // });
      .subscribe(params => {
        const questionId = params.get('id');
        this._store.dispatch(new questionAction.LoadOne(questionId, false));
        this._store.dispatch(new replyAction.Load(questionId));
        this._store.dispatch(new commentAction.Load(questionId));
      });
    // .switchMap(p => this._httpClient.get(`http://localhost:3000/questions/${p.get('id')}`))
    // .filter((p: any) => p.success)
    // .subscribe((p: any) => this.question = p.successResult);
    // .switchMap(p => this._httpClient.get(`http://localhost:3000/questions/${p.get('id')}`))
    // .subscribe(r => {
    //   console.log('p: ', r);
    // });
    // .map(p => p.get('id')).subscribe(p => {
    //   this._httpClient
    //     .get(`http://localhost:3000/questions/${p}`)
    //     .subscribe(r => console.log(r));
    // });
  }

  public onSubmitReply(content: any): void {
    console.log('content: ', content);
    this._store.dispatch(new replyAction.Post({ questionId: this.question.id, content }));
  }

}
