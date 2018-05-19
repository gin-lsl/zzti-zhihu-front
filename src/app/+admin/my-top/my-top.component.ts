import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, API, parseUserStorage } from '../../utils';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-my-top',
  templateUrl: './my-top.component.html',
  styleUrls: ['./my-top.component.less']
})
export class MyTopComponent implements OnInit, OnDestroy {
  questions: Array<any> = [];
  private _question_subscription: Subscription;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    const user = parseUserStorage();
    let headers = new HttpHeaders();
    if (user) {
      headers = headers.append('Authorization', user.access_token);
    }
    this._question_subscription = this._httpClient
      .get<API>(API_HOST + '/questions/top', { headers })
      .subscribe(res => {
        if (res.success) {
          this.questions = res.successResult;
        } else {
          this.questions = [];
        }
      });
  }

  ngOnDestroy() {
    this._question_subscription && this._question_subscription.unsubscribe();
  }

  onCancelTopIt(qid: string) {
    const user = parseUserStorage();
    let headers = new HttpHeaders();
    if (user) {
      headers = headers.append('Authorization', user.access_token);
    }
    this._httpClient.put(`${API_HOST}/questions/cancel-top/${qid}`, {}, { headers })
      .subscribe((r: API) => {
        if (r.success) {
          this.questions = this.questions.filter(item => item.id !== qid);
        }
      });
  }

}
