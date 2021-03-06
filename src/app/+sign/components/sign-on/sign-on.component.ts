import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.less']
})
export class SignOnComponent {

  public email: string;

  @Input()
  public errorMessage: string;

  @Output()
  private submit: EventEmitter<string> = new EventEmitter();

  constructor() { }

  public onSubmit(): void {
    this.submit.emit(this.email);
  }

}
