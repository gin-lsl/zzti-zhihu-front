import { Component, OnInit } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_HOST, ACCESS_TOKEN } from '../../../utils/index';

@Component({
  selector: 'app-new-question-box',
  templateUrl: './new-question-box.component.html',
  styleUrls: ['./new-question-box.component.less']
})
export class NewQuestionBoxComponent implements OnInit {

  public questionModel: any;

  public separatorKeyCodes = [ENTER, COMMA];

  constructor(
    private _httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.questionModel = {};
  }

  public onSubmit(): void {
    console.log('questionModel: ', this.questionModel);
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    this._httpClient
      .post(API_HOST + '/questions/post', this.questionModel, {
        headers: new HttpHeaders().append('Authorization', access_token)
      })
      .subscribe(r => {
        console.log('r: ', r);
      });
  }

  public remove(tag: any): void {

  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (!this.questionModel.tags) {
      this.questionModel.tags = [];
    }

    if (this.questionModel.tags.length >= 5) {
      return;
    }

    if (value) {
      console.log('test: ', value);
      this.questionModel.tags.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

}
