import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskPageComponent } from './components/ask-page/ask-page.component';
import { AskPrePageComponent } from './containers/ask-pre-page/ask-pre-page.component';

const routes: Routes = [
  { path: '', component: AskPageComponent },
  { path: 'pre', component: AskPrePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AskRoutingModule { }
