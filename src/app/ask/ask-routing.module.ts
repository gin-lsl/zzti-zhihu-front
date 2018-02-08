import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskPrePageContainerComponent } from './containers/ask-pre-page-container/ask-pre-page-container.component';
import { AskPageContainerComponent } from './containers/ask-page-container/ask-page-container.component';
import { CanGoAskPageGuard } from './services/can-go-ask-page.guard';

const routes: Routes = [
  { path: 'post', component: AskPageContainerComponent },
  { path: 'pre', component: AskPrePageContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [
  //   CanGoAskPageGuard,
  // ]
})
export class AskRoutingModule { }
