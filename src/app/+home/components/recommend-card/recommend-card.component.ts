import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommend-card',
  templateUrl: './recommend-card.component.html',
  styleUrls: ['./recommend-card.component.less']
})
export class RecommendCardComponent implements OnInit {

  @Input()
  public question: any;

  constructor() { }

  ngOnInit() {
  }

}
