import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: 'app/+home/home.module#HomeModule'
  },
  {
    path: 'sign', loadChildren: 'app/+sign/sign.module#SignModule'
  },
  {
    path: 'question', loadChildren: 'app/+question/question.module#QuestionModule'
  },
  {
    path: 'user', loadChildren: 'app/+user/user.module#UserModule'
  },
  {
    path: 'ask', loadChildren: 'app/+ask/ask.module#AskModule'
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
