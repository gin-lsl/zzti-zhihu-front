import { Component, OnInit } from '@angular/core';
import * as fromAskModule from '../../ngrx/reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ask-pre-page',
  templateUrl: './ask-pre-page.component.html',
  styleUrls: ['./ask-pre-page.component.less']
})
export class AskPrePageComponent implements OnInit {

  constructor(
    private store: Store<fromAskModule.State>,
  ) { }

  ngOnInit() {
  }

}
