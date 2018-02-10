import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAskModule from '../../ngrx/reducers/index';
import * as searchTextAction from '../../ngrx/actions/search-text.action';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-ask-pre-page-container',
  templateUrl: './ask-pre-page-container.component.html',
  styleUrls: ['./ask-pre-page-container.component.less']
})
export class AskPrePageContainerComponent implements OnInit {

  public searchResult$: Observable<any>;

  constructor(
    private store: Store<fromAskModule.State>,
  ) {
    this.searchResult$ = store.select(fromAskModule.getAllSearchResult);
    this.searchResult$.subscribe(state => {
      console.log('searchResult$: ', state);
    });
  }

  ngOnInit() {
  }

  public onSearchTextChange(text: string): void {
    console.log('onSearchTextChange: ', text);
    this.store.dispatch(new searchTextAction.Search(text));
  }

}
