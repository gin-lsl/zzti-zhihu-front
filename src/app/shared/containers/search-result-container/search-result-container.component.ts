import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromQuestionModule from '../../../ngrx/question/reducers/index';

@Component({
  selector: 'app-search-result-container',
  templateUrl: './search-result-container.component.html',
  styleUrls: ['./search-result-container.component.less']
})
export class SearchResultContainerComponent implements OnInit {

  public searchResults$: Observable<any>;

  public searching$: Observable<boolean>;

  constructor(private _store: Store<any>) {
    this.searchResults$ = _store.select(fromQuestionModule.getSearchResults);
    this.searching$ = _store.select(fromQuestionModule.getSearchBoxFocus);
  }

  ngOnInit() {
  }

}
