import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    UserService,
    HttpService,
  ]
})
export class CoreModule { }
