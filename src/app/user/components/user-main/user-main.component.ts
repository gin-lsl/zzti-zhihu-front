import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.less']
})
export class UserMainComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.httpClient
      .get('http://localhost:3000/questions')
      .subscribe((r: any) => {
        console.log('r: ', r);
        // this.questions = r.successResult;
      });
  }

}
