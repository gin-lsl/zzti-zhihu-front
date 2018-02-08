import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromAskModule from '../../ngrx/reducers/index';
import * as askAction from '../../ngrx/actions/ask.action';
import * as fromRoot from '../../../ngrx/reducers/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-ask-page-container',
  templateUrl: './ask-page-container.component.html',
  styleUrls: ['./ask-page-container.component.less']
})
export class AskPageContainerComponent implements OnInit, OnDestroy {

  // private hasOldSubscription: Subscription;

  public ask$: Observable<any>;

  constructor(
    private _store: Store<fromAskModule.State>,
    private _httpClient: HttpClient,
    // private _router: Router,
  ) {
    this.ask$ = _store.select(fromAskModule.selectAskState);
    this.ask$.subscribe(state => {
      console.log('askState: ', state);
    });
    // this.hasOldSubscription = _store
    //   // .select(fromAskModule.getHasOldAsk)
    //   .map(state => {
    //     return {

    //     }
    //   })
    //   .subscribe(hasOld => {
    //     if (!hasOld) {
    //       _router.navigateByUrl('/ask/pre');
    //     }
    //   });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.hasOldSubscription.unsubscribe;
  }

  public onSubmitPostAsk(ask: any): void {
    console.log('onSubmitPostAsk: ', ask);
    this._store.dispatch(new askAction.Post(ask));
  }

}
