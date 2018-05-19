import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export class SignInModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent {

  @Input()
  public errorMessage: string;

  @Output()
  private submit: EventEmitter<SignInModel> = new EventEmitter<SignInModel>();

  public formGroup: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    isAdmin: new FormControl(''),
  });

  constructor() { }


  /**
   * 登录
   */
  public onSubmit(): void {
    this.submit.emit(this.formGroup.value);
  }

}
