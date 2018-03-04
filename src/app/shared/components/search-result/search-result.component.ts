import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

  @Input()
  public results: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
