import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TopComponent } from './top/top.component';
import { MyTopComponent } from './my-top/my-top.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'top', pathMatch: 'full' },
      { path: 'top', component: TopComponent },
      { path: 'my-top', component: MyTopComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
