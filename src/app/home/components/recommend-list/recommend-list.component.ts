import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommend-list',
  templateUrl: './recommend-list.component.html',
  styleUrls: ['./recommend-list.component.less']
})
export class RecommendListComponent implements OnInit, OnDestroy {

  public questions: Array<any>;

  constructor(
    private httpClient: HttpClient,
  ) {
    console.log('ngOnInit钩子');
    this.httpClient
      .get('http://localhost:3000/questions')
      .subscribe((r: any) => {
        console.log('r: ', r);
        this.questions = r.successResult;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('ngOnDestroy钩子');
  }

}
