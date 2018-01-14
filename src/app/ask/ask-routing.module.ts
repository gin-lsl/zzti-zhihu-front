import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskPageComponent } from './components/ask-page/ask-page.component';

const routes: Routes = [
  { path: '', component: AskPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AskRoutingModule { }
