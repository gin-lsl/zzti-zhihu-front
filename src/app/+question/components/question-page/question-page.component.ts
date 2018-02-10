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

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.less']
})
export class QuestionPageComponent implements OnInit {

  public question: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public _httpClient: HttpClient,
  ) { }

  ngOnInit() {
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
      .switchMap(p => this._httpClient.get(`http://localhost:3000/questions/${p.get('id')}`))
      .filter((p: any) => p.success)
      .subscribe((p: any) => this.question = p.successResult);
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
  }

}
