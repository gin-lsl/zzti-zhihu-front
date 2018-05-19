import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgrxModule } from './ngrx/ngrx.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './ngrx/root/reducers/index';
import { CustomRouterStateSerializer } from './utils/index';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';

/**
 * 可选模块, 在产品模式将不会被编译到项目中
 */
const optionalModules = environment.production ? [] : [StoreDevtoolsModule.instrument()];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
    CoreModule,
    NgrxModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'routerState',
    }),
    EffectsModule.forRoot([]),
  ].concat(optionalModules),
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
