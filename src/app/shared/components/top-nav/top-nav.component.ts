import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User, ISignIn } from '../../../utils/index';
import * as questionAction from '../../../ngrx/question/actions/question.action';
import * as fromQuestionModule from '../../../ngrx/question/reducers/index';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.less']
})
export class TopNavComponent {

  /**
   * 已登录用户的用户信息
   */
  @Input()
  public loginedUser: User | ISignIn | any = {};

  @Output()
  public signOut: EventEmitter<any> = new EventEmitter();

  @ViewChild('searchBox')
  private searchBoxRef: ElementRef;

  public searching$: Observable<boolean>;

  searchResults$: Observable<any>;

  constructor(private _store: Store<any>, private _router: Router) {
    this.searching$ = _store.select(fromQuestionModule.getSearchBoxFocus);
    this.searchResults$ = _store.select(fromQuestionModule.getSearchResults);
  }

  public onExit(): void {
    this.signOut.emit();
  }

  public toggleSearching(focus: boolean): void {
    this._store.dispatch(new questionAction.SearchBoxFocusChange(focus));
  }

  public onSearch(value: string): void {
    this._store.dispatch(new questionAction.Search(value));
  }

  public onAutoCompleteSelectedOption(value: string): void {
    this._router.navigateByUrl('/question/' + value).then(() => {
      if (this.searchBoxRef) {
        (this.searchBoxRef.nativeElement as HTMLInputElement).blur();
      }
    });
  }

}
