import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './+home/home.module';
import { SignModule } from './+sign/sign.module';
import { QuestionModule } from './+question/question.module';
import { UserModule } from './+user/user.module';
import { AskModule } from './+ask/ask.module';
import { AdminModule } from './+admin/admin.module';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: 'app/\+home/home.module#HomeModule'
    // path: 'home', loadChildren: () => HomeModule,
  },
  {
    path: 'sign', loadChildren: 'app/+sign/sign.module#SignModule'
    // path: 'sign', loadChildren: () => SignModule,
  },
  {
    path: 'question', loadChildren: 'app/+question/question.module#QuestionModule'
    // path: 'question', loadChildren: () => QuestionModule,
  },
  {
    path: 'user', loadChildren: 'app/+user/user.module#UserModule'
    // path: 'user', loadChildren: () => UserModule,
  },
  {
    path: 'ask', loadChildren: 'app/+ask/ask.module#AskModule'
    // path: 'ask', loadChildren: () => AskModule,
  },
  {
    path: 'admin', loadChildren: 'app/+admin/admin.module#AdminModule',
    // path: 'admin', loadChildren: () => AdminModule
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
