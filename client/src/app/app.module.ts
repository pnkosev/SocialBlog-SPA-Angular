import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from './core/core.module';
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptorService } from './core/interceptors/jwt-interceptor.service';
import { MsgInterceptorService } from './core/interceptors/msg-interceptor.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    CoreModule.forRoot(),
    ToastrModule.forRoot({
      newestOnTop: false,
    }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsgInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
