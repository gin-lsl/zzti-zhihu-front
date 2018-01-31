import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAskModule from '../../ngrx/reducers/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ask-page-container',
  templateUrl: './ask-page-container.component.html',
  styleUrls: ['./ask-page-container.component.less']
})
export class AskPageContainerComponent implements OnInit {

  constructor(
    private store: Store<fromAskModule.State>,
    private _httpClient: HttpClient,
  ) {
  }

  ngOnInit() {
  }

  public onSubmitPostAsk(ask: any): void {
    console.log('onSubmitPostAsk: ', ask);
    const access_token = localStorage.getItem('ACCESS__TOKEN');
    this._httpClient
      .post('http://localhost:3000/questions/post', ask, { headers: new HttpHeaders().append('Authorization', access_token) })
      .subscribe(res => {
        console.log('res: ', res);
      });
  }

}
