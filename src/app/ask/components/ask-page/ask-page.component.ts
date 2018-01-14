import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ask-page',
  templateUrl: './ask-page.component.html',
  styleUrls: ['./ask-page.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AskPageComponent implements OnInit {

  public question: any = {};

  constructor() { }

  ngOnInit() {
  }

}
