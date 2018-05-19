import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { API_HOST, API, parseUserStorage } from '../../utils';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/auditTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.less']
})
export class TopComponent implements OnInit, OnDestroy {

  questions: Array<any> = [];

  search$: Subject<any>;

  private _search_Subscription: Subscription;

  constructor(private _httpClient: HttpClient) {
    this.search$ = new Subject();
  }

  ngOnInit() {
    this._search_Subscription = this.search$
      .auditTime(500)
      .distinctUntilChanged()
      .switchMap(text => this._httpClient
        .get(API_HOST + '/questions/search', { params: new HttpParams().append('search', text) }))
      .subscribe((res: API) => {
        if (res.success && res.successResult) {
          this.questions = res.successResult.byTitle;
        } else {
          this.questions = [];
        }
      });
  }

  onSearch(text: string) {
    this.search$.next(text);
  }

  onTopIt(id: string, hasTop: boolean) {
    const user = parseUserStorage();
    let headers = new HttpHeaders();
    if (user) {
      headers = headers.append('Authorization', user.access_token);
    }
    this._httpClient.put(`${API_HOST}/questions/${hasTop ? 'cancel-top' : 'top'}/${id}`, {}, { headers })
      .subscribe((r: API) => {
        if (r.success) {
          const q = this.questions.find(item => item.id === id);
          q.isTop = !hasTop;
        }
      });
  }

  ngOnDestroy() {
    this._search_Subscription && this._search_Subscription.unsubscribe();
  }

}
