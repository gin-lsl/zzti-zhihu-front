import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignService } from './services/sign.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SignService,
    UserService,
  ]
})
export class CoreModule { }
