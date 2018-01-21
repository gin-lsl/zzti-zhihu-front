import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommend-list',
  templateUrl: './recommend-list.component.html',
  styleUrls: ['./recommend-list.component.less']
})
export class RecommendListComponent implements OnInit {

  @Input()
  public questions: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
