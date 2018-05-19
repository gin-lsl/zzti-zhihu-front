import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TopComponent } from './top/top.component';
import { MyTopComponent } from './my-top/my-top.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  declarations: [AdminPageComponent, TopComponent, MyTopComponent]
})
export class AdminModule { }
